const puppeteer = require('puppeteer');
const { clearCookies } = require('./helpers');

let browser;

before(async function () {
  browser = await puppeteer.launch('CI' in process.env ? {
    ignoreHTTPSErrors: true,
    args: ['--no-sandbox'],
  } : {ignoreHTTPSErrors: true});
  global.tab = await browser.newPage();
});

before(async function () {
  await clearCookies();
  const configuration = await tab.evaluate(() => document.body.innerText);
  console.log('OP .well-known/openid-configuration', JSON.parse(configuration, null, 4));
});
