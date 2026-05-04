import LoginPage from '../pages/LoginPage';
import { Routes, LoginErrors } from '../support/constants';
import type { UsersFixture } from '../support/types';

describe('SauceDemo - Login', () => {
  let users: UsersFixture;

  before(() => {
    cy.fixture<UsersFixture>('auth/users').then((data) => {
      users = data;
    });
  });

  it('logs in successfully with a valid user', () => {
    cy.loginBySession(users.validUser);
    cy.visit(Routes.inventory, { failOnStatusCode: false });
    cy.url().should('include', Routes.inventory);
  });

  it('shows an error for invalid credentials', () => {
    cy.login(users.invalidUser);
    LoginPage.expectErrorContains(LoginErrors.invalidCredentials);
  });

  it('shows an error for a locked-out user', () => {
    cy.login(users.lockedUser);
    LoginPage.expectErrorContains(LoginErrors.lockedOut);
  });
});
