import { defineConfig } from 'cypress';
import * as fs from 'fs';
import { resolveEnvironment, buildReportTitle } from './cypress/config/environment';

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
      const { environment, baseUrl } = resolveEnvironment(config);
      config.baseUrl = baseUrl;
      config.env.environment = environment;

      if (config.reporterOptions) {
        (config.reporterOptions as Record<string, unknown>).reportPageTitle =
          buildReportTitle(environment);
      }

      // Discard videos for fully passing specs to keep artifacts small.
      on('after:spec', (_spec, results) => {
        if (results?.video && results.stats.failures === 0 && fs.existsSync(results.video)) {
          fs.unlinkSync(results.video);
        }
      });

      return config;
    },
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'reports/mochawesome',
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    reportPageTitle: 'SauceDemo Test Report',
  },
});
