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
        // In production, use 'https://api.pagseguro.com/orders'
        // In sandbox, use 'https://sandbox.api.pagseguro.com/orders'
        // We'll default to sandbox for safety unless PAGSEGURO_ENV is 'production'
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
            notification_urls: [
                // PagSeguro requires valid URL. If localhost, use a dummy one to pass Sandbox validation.
                process.env.BASE_URL.includes('localhost')
                    ? 'https://procuraqui.com/api/webhook?source=pagseguro'
                    : `${process.env.BASE_URL}/api/webhook?source=pagseguro`
            ]
            // For redirect, PagSeguro behavior is different from MP Preference.
            // Orders API usually returns links.
        };

        const response = await axios.post(`${baseUrl}/orders`, payload, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'x-api-version': '4.0' // Recommended for V4
            }
        });

        // Extract payment link (if available) or return order details
        // PagSeguro Orders response has 'links' array. Look for 'checkout' or 'pay'.
        // Actually, for "Checkout Transparent" or "Redirect", it might be different.
        // If we want a simple link like MP, we might look for keys in response.
        // Assuming we want to return the whole response for the frontend to handle, or a specific link.

        const links = response.data.links || [];
        const paymentLink = links.find(l => l.rel === 'pay' || l.rel === 'checkout');

        return res.status(200).json({
            id: response.data.id,
            init_point: paymentLink ? paymentLink.href : null, // Mapped to maintain compatibility with frontend if possible
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
