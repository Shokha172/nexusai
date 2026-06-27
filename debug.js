const puppeteer = require('puppeteer');

(async () => {
  console.log("Starting browser...");
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));

  console.log("Navigating to http://localhost:3001...");
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle0' });
  
  console.log("Page loaded. Taking screenshot...");
  await page.screenshot({ path: 'debug.png' });
  
  await browser.close();
  console.log("Done.");
})();
