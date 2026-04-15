import { defineConfig } from "cypress";
import * as fs from "fs";

export default defineConfig({
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
      const baseUrls: Record<string, string> = {
        dev: "https://www.saucedemo.com/",
        staging: process.env.CYPRESS_BASE_URL_STAGING ?? "https://www.saucedemo.com/",
        prod: process.env.CYPRESS_BASE_URL_PROD ?? "https://www.saucedemo.com/",
      };

      const environment =
        (config.env.environment as string) ?? process.env.TEST_ENV ?? "dev";
      config.baseUrl =
        (config.env.baseUrl as string) ??
        process.env.CYPRESS_BASE_URL ??
        baseUrls[environment] ??
        baseUrls["dev"];

      // Enrich report title with CI build metadata (Jenkins sets these automatically)
      const buildNumber = process.env.BUILD_NUMBER ?? "local";
      const gitBranch = process.env.GIT_BRANCH ?? process.env.BRANCH_NAME ?? "local";
      const gitCommit = process.env.GIT_COMMIT?.substring(0, 7) ?? "local";
      if (config.reporterOptions) {
        (config.reporterOptions as Record<string, unknown>)["reportPageTitle"] =
          `SauceDemo | ${environment} | Build ${buildNumber} | ${gitBranch} @ ${gitCommit}`;
      }

      // Keep video only when spec has failures — reduces artifact noise
      on("after:spec", (_spec, results) => {
        if (results?.video && results.stats.failures === 0) {
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
    reportPageTitle: "SauceDemo Test Report",
  },
});
