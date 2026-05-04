import LoginPage from '../pages/LoginPage';
import { Routes } from './constants';
import type { User } from './types';

/**
 * UI login. Use for negative test cases (invalid / locked users)
 * where you want to assert error messaging on the login screen.
 */
Cypress.Commands.add('login', (user: User) => {
  LoginPage.visit().login(user);
});

/**
 * Cached login via `cy.session`. Use when a test only needs to *be*
 * authenticated; the session is reused across tests of the same user.
 */
Cypress.Commands.add('loginBySession', (user: User) => {
  cy.session(
    ['saucedemo', user.username],
    () => {
      LoginPage.visit().login(user);
      cy.url().should('include', Routes.inventory);
    },
    {
      validate: () => {
        // SauceDemo is a static SPA — visiting /inventory.html directly returns
        // 404 even when authenticated, so we ignore the status code.
        cy.visit(Routes.inventory, { failOnStatusCode: false });
        cy.url().should('include', Routes.inventory);
      },
      cacheAcrossSpecs: true,
    },
  );
});
