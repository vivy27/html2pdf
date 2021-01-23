const puppeteer = require('puppeteer');

async function generatePdf(file, options) {
  // we are using headless mode
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });
  const page = await browser.newPage();

  await page.goto(file.url, {
    waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2'],
  });

  const bufferData = await page.pdf(options);
  await browser.close();
  return Buffer.from(Object.values(bufferData));
}

module.exports.generatePdf = generatePdf;
