const puppeteer = require("puppeteer");

void (async () => {
  try {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.goto("https://scrapethissite.com/pages/forms/");

    const teams = await page.evaluate(() => {
      const grabFromRow = (row, classname) => row
        .querySelector(`td.${classname}`)
        .innerText
        .trim();

      const TEAM_ROW_SELECTOR = "tr.team";

      const data = [];

      const teamRows = document.querySelectorAll(TEAM_ROW_SELECTOR);

      teamRows.forEach(row =>
        data.push({
          name: grabFromRow(row, "name"),
          year: grabFromRow(row, "year"),
          wins: grabFromRow(row, "wins"),
          losses: grabFromRow(row, "losses"),
        })
      );

      return data;
    });

    await browser.close();

    console.log(JSON.stringify(teams, null, 2));
  } catch (error) {
    console.log(error);
  }
})();
