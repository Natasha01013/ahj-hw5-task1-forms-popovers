const puppeteer = require('puppeteer');

jest.setTimeout(60000); // Увеличиваем тайм-аут для теста

describe('Popover test', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        try {
            console.log('Переход по URL http://localhost:9000');
            await page.goto('http://localhost:9000');
            console.log('Страница доступна!');
          } catch (err) {
            console.error('Ошибка при переходе на страницу:', err);
          }
    });

    afterAll(async () => {
        if (browser) {
            await browser.close();
        }
    });

    // Закрытие popover перед каждым тестом, если он открыт
    beforeEach(async () => {
      const popoverVisible = await page.$eval('#popover', el => el.style.display === 'block');
      if (popoverVisible) {
          await page.click('#popover-button'); // Закрываем popover, кликнув на кнопку
      }
    });

    test('Popover should appear when button is clicked', async () => {
        await page.click('#popover-button');
        const popoverVisible = await page.$eval('#popover', el => el.style.display === 'block');
        expect(popoverVisible).toBe(true);
      });
    
    test('Popover should be centered horizontally over button', async () => {
        await page.click('#popover-button'); // Открываем поповер перед тестом
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