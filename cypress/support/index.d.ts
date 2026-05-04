/// <reference types="cypress" />

import type { User } from './types';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Log in via UI. Suitable for negative test cases that need to assert
       * error messaging.
       *
       * @example cy.login({ username: 'standard_user', password: 'secret_sauce' })
       */
      login(user: User): Chainable<void>;

      /**
       * Log in via `cy.session` so the authenticated state is cached and
       * reused across tests.
       *
       * @example cy.loginBySession(users.validUser)
       */
      loginBySession(user: User): Chainable<void>;
    }
  }
}

export {};
