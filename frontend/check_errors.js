const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err));

  try {
    await page.goto('http://localhost:5174/YardStack/', { waitUntil: 'networkidle2', timeout: 10000 });
    console.log('Page loaded successfully');
  } catch (err) {
    console.error('Failed to load page:', err);
  }

  await browser.close();
})();
