module.exports = {
    preset: 'jest-puppeteer',
    testTimeout: 30000,  // Увеличиваем тайм-аут для e2e тестов
    globals: {
      URL: 'http://localhost:9000', // Адрес локального сервера
    },
    // testEnvironment: 'jest-environment-jsdom', // Это эмулирует среду браузера
  };