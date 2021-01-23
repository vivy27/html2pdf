const puppeteer = require('puppeteer');
const hb = require('handlebars')

async function generatePdf(file, options) {
  // we are using headless mode
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });
  const page = await browser.newPage();

  if(file.content) {
    console.log("Compiling the template with handlebars")
    // we have compile our code with handlebars
    const template = hb.compile(file.content, { strict: true });
    const result = template(file.content);
    const html = result;

    // We set the page content as the generated html by handlebars
    await page.setContent(html);
  } else {
    await page.goto(file.url, {
      waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2'],
    });
  }

  const bufferData = await page.pdf(options);
  await browser.close();
  return Buffer.from(Object.values(bufferData));
}

module.exports.generatePdf = generatePdf;
