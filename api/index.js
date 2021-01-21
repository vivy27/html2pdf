const router = require('express').Router();
const convertHTMLToPDF = require('../functions/generatePdf');

router.post('/pdf', async (req, res) => {
    const options = {
        format: 'A4',
        margin: {
            top: '1cm',
            right: '1cm',
            bottom: '1cm',
            left: '1cm'
        }
    };
    const file = { url: req.body.url || 'https://www.google.com' };

    try {
        const pdfBuffer = await convertHTMLToPDF.generatePdf(file, options);
        res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdfBuffer.length, 'Content-Disposition': 'attachment; filename=test' }).send(pdfBuffer);
    }
    catch(err) {
        res.status(500).send(err);
    }
});

module.exports = router;