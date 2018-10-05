const puppeteer = require("puppeteer");

void (async () => {
  try {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.goto("https://scrapethissite.com/pages/forms/");

    await page.screenshot({
      path: "./screenshots/page1.png"
    });
    console.log("generating screenshot...");

    await page.pdf({
      path: "./pdfs/page1.pdf"
    });
    console.log("generating pdf...");

    await browser.close();
  } catch (error) {
    console.log(error);
  }
})();
