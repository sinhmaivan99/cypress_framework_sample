const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com/",
    setupNodeEvents(on, config) {
      // không cần plugin riêng cho mochawesome
    },
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "reports/mochawesome",
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    reportPageTitle: "SauceDemo Test Report"
  }
});
