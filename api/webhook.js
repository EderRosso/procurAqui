module.exports = async (req, res) => {
    // PagSeguro V4 Webhook Handler
    // Should verify signature if possible, but for MVP we just accept valid JSON

    // Log the incoming event
    console.log("PagSeguro Webhook Received:", JSON.stringify(req.body, null, 2));

    try {
        const { id, reference_id, status, charges } = req.body;

        // Example logic:
        if (status === 'PAID' || (charges && charges.some(c => c.status === 'PAID'))) {
            console.log(`Order ${reference_id || id} confirmed as PAID.`);
            // TODO: Update database
        } else {
            console.log(`Order ${reference_id || id} status update: ${status}`);
        }

        return res.status(200).send('OK');
    } catch (err) {
        console.error("Webhook processing error:", err);
        return res.status(500).send('Error');
    }
};
