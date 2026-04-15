const { defineConfig } = require("cypress");

module.exports = defineConfig({
  retries: {
    runMode: 2,
    openMode: 0,
  },
  defaultCommandTimeout: 8000,
  requestTimeout: 15000,
  responseTimeout: 30000,
  pageLoadTimeout: 60000,
  video: true,
  screenshotOnRunFailure: true,
  trashAssetsBeforeRuns: true,
  e2e: {
    setupNodeEvents(on, config) {
      const baseUrls = {
        dev: "https://www.saucedemo.com/",
        staging: process.env.CYPRESS_BASE_URL_STAGING || "https://www.saucedemo.com/",
        prod: process.env.CYPRESS_BASE_URL_PROD || "https://www.saucedemo.com/",
      };

      const environment = config.env.environment || process.env.TEST_ENV || "dev";
      config.baseUrl = config.env.baseUrl || process.env.CYPRESS_BASE_URL || baseUrls[environment] || baseUrls.dev;

      // Keep videos only when spec has failures to reduce artifact noise.
      on("after:spec", (spec, results) => {
        if (results && results.video && results.stats && results.stats.failures === 0) {
          const fs = require("fs");
          if (fs.existsSync(results.video)) {
            fs.unlinkSync(results.video);
          }
        }
      });

      return config;
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
