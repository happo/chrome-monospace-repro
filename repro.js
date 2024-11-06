const { chromium } = require('playwright');
const crypto = require('crypto');
const fs = require('fs');

function createHash(data) {
  return crypto.createHash('md5').update(data).digest('hex');
}

async function takeScreenshot(page, html) {
  await page.setContent(html);
  const element = await page.$('body *');
  const pngBuf = await element.screenshot();
  const hash = createHash(pngBuf);
  fs.writeFileSync(`${hash}.png`, pngBuf);
  return hash;
}

async function run() {
  const browser = await chromium.launch();

  const page = await browser.newPage();
  const firstHash = await takeScreenshot(page, '<pre>Hello world</pre>');
  const secondHash = await takeScreenshot(
    page,
    '<div style="height: 200vh; background: red;"></div>',
  );
  const thirdHash = await takeScreenshot(page, '<pre>Hello world</pre>');

  console.log(`${firstHash}.png`);
  console.log(`${thirdHash}.png`);
  await browser.close();
}

run()
  .then(() => {
    process.exit(0);
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
