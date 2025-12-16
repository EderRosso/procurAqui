const { PDFDocument, rgb } = require('pdf-lib');

// This endpoint assumes the user has paid.
// In a real app, pass an 'orderId' or 'token' in the body verify against DB.

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { text, title, isPremium } = req.body;

        // Security Check (Simulated)
        // const isPaid = await db.checkOrder(req.body.token);
        // if (!isPaid) return res.status(403).send('Not Paid');

        // However, since we are doing a "Client-side generation with Vercel Middleware possibility",
        // we can actually generate a high-quality PDF here using pdf-lib which is more robust than jsPDF.

        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();
        const fontSize = 12;

        page.drawText(title, {
            x: 50,
            y: height - 50,
            size: 18,
        });

        page.drawText(text, {
            x: 50,
            y: height - 100,
            size: 12,
            maxWidth: width - 100,
            lineHeight: 18,
        });

        if (!isPremium) {
            // Server-side Watermark
            page.drawText('PROCURAQUI - GRÁTIS', {
                x: width / 2 - 100,
                y: height / 2,
                size: 50,
                color: rgb(0.8, 0.8, 0.8),
                opacity: 0.5,
                rotate: { type: 'degrees', angle: 45 },
            });
        }

        const pdfBytes = await pdfDoc.save();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=procuracao.pdf');
        res.send(Buffer.from(pdfBytes));

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to generate PDF' });
    }
};
