const axios = require('axios');
// UUID import removed, using crypto native
const crypto = require('crypto');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { templateType, customerName } = req.body;
        const token = process.env.PAGSEGURO_TOKEN;
        // Basic Environment Switch
        // In production, use 'https://api.pagseguro.com'
        // In sandbox, use 'https://sandbox.api.pagseguro.com'
        const baseUrl = process.env.PAGSEGURO_ENV === 'production'
            ? 'https://api.pagseguro.com'
            : 'https://sandbox.api.pagseguro.com';

        const referenceId = crypto.randomUUID(); // Node 14.17+

        const payload = {
            reference_id: referenceId,
            customer: {
                name: customerName || 'Cliente ProcurAqui',
                email: 'cliente@exemplo.com', // Required by PagSeguro
                tax_id: '12345678909', // Dummy CPF for Sandbox. Real app needs this input.
                phones: [
                    {
                        country: '55',
                        area: '11',
                        number: '999999999',
                        type: 'MOBILE'
                    }
                ]
            },
            items: [
                {
                    reference_id: `TEMPLATE_${templateType}`,
                    name: `Procuração Premium (${templateType})`,
                    quantity: 1,
                    unit_amount: 490 // R$ 4,90 (in cents)
                }
            ],
            // For /checkouts, we can specify redirect_url directly
            redirect_url: process.env.VERCEL_URL
                ? `https://${process.env.VERCEL_URL}/obrigado`
                : (process.env.BASE_URL && process.env.BASE_URL.includes('localhost')
                    ? 'https://procuraqui.com/obrigado'
                    : `${process.env.BASE_URL}/obrigado`),
            notification_urls: [
                // Use VERCEL_URL if available (Production/Preview), otherwise BASE_URL (Local)
                process.env.VERCEL_URL
                    ? `https://${process.env.VERCEL_URL}/api/webhook?source=pagseguro`
                    : (process.env.BASE_URL && process.env.BASE_URL.includes('localhost')
                        ? 'https://procuraqui.com/api/webhook?source=pagseguro' // Sandbox Dummy
                        : `${process.env.BASE_URL}/api/webhook?source=pagseguro`)
            ],
            payment_methods: [
                { type: 'CREDIT_CARD' },
                { type: 'BOLETO' },
                { type: 'PIX' }
            ]
        };

        // endpoint: /checkouts
        const response = await axios.post(`${baseUrl}/checkouts`, payload, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'x-api-version': '4.0'
            }
        });

        const links = response.data.links || [];
        // For /checkouts, the link is usually 'PAY' or 'SELF' or specifically classified.
        // We look for any link that seems to be the redirect.
        // Strictly look for PAY or checkout. Do NOT use SELF as it is the API endpoint.
        const paymentLink = links.find(l => l.rel === 'PAY' || l.rel === 'pay' || l.rel === 'checkout');

        console.log("PagSeguro Checkout Response:", JSON.stringify(response.data, null, 2));

        return res.status(200).json({
            id: response.data.id,
            init_point: paymentLink ? paymentLink.href : null,
            full_response: response.data
        });

    } catch (error) {
        console.error("PagSeguro Error:", error.response ? error.response.data : error.message);
        return res.status(500).json({
            error: 'Payment Creation Failed',
            details: error.response ? error.response.data : error.message
        });
    }
};
