/**
 * Environment helpers for Cypress configuration.
 *
 * Resolves baseUrl based on the requested environment with the following
 * priority:
 *   1. `--env baseUrl=...` passed to the CLI
 *   2. CYPRESS_BASE_URL
 *   3. Per-environment URL (dev / staging / prod)
 *   4. Fallback to dev
 */

const DEFAULT_URL = 'https://www.saucedemo.com/';

export type Environment = 'dev' | 'staging' | 'prod';

export interface ResolvedEnv {
  environment: Environment;
  baseUrl: string;
}

const envUrls: Record<Environment, string> = {
  dev: DEFAULT_URL,
  staging: process.env.CYPRESS_BASE_URL_STAGING ?? DEFAULT_URL,
  prod: process.env.CYPRESS_BASE_URL_PROD ?? DEFAULT_URL,
};

function isEnvironment(value: unknown): value is Environment {
  return value === 'dev' || value === 'staging' || value === 'prod';
}

export function resolveEnvironment(config: Cypress.PluginConfigOptions): ResolvedEnv {
  const candidate = config.env.environment ?? process.env.TEST_ENV ?? 'dev';
  const environment: Environment = isEnvironment(candidate) ? candidate : 'dev';

  const baseUrl =
    (config.env.baseUrl as string | undefined) ??
    process.env.CYPRESS_BASE_URL ??
    envUrls[environment];

  return { environment, baseUrl };
}

export function buildReportTitle(environment: Environment): string {
  const buildNumber = process.env.BUILD_NUMBER ?? 'local';
  const gitBranch = process.env.GIT_BRANCH ?? process.env.BRANCH_NAME ?? 'local';
  const gitCommit = process.env.GIT_COMMIT?.substring(0, 7) ?? 'local';
  return `SauceDemo | ${environment} | Build ${buildNumber} | ${gitBranch} @ ${gitCommit}`;
}
