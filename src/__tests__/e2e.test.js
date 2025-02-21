const puppeteer = require('puppeteer');

describe('Popover test', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('http://localhost:9000'); 
    });

    afterAll(async () => {
        if (browser) {
            await browser.close();
        }
    });

    test('Popover should appear when button is clicked', async () => {
        await page.click('#popover-button');
        const popoverVisible = await page.$eval('#popover', el => el.style.display === 'block');
        expect(popoverVisible).toBe(true);
      });
    
    test('Popover should be centered horizontally over button', async () => {
        const buttonPosition = await page.$eval('#popover-button', button => {
          const rect = button.getBoundingClientRect();
          return { left: rect.left, height: rect.height };
        });
    
        const popoverPosition = await page.$eval('#popover', popover => {
          const rect = popover.getBoundingClientRect();
          return { left: rect.left, height: rect.height };
        });
    
        const expectedLeft = buttonPosition.left + buttonPosition.height / 2 - 50;
        expect(Math.abs(popoverPosition.left - expectedLeft)).toBeLessThan(1);
      });
});