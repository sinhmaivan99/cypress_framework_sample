import { Routes } from '../support/constants';
import type { User } from '../support/types';

type Element = Cypress.Chainable<JQuery<HTMLElement>>;

/**
 * Page Object for the SauceDemo login screen.
 *
 * Selectors prefer the stable `data-test` attribute. The class exposes a
 * fluent API so callers can chain page actions.
 */
class LoginPage {
  readonly elements = {
    usernameInput: (): Element => cy.get('[data-test="username"]'),
    passwordInput: (): Element => cy.get('[data-test="password"]'),
    loginButton: (): Element => cy.get('[data-test="login-button"]'),
    errorMessage: (): Element => cy.get('[data-test="error"]'),
  };

  visit(): this {
    cy.visit(Routes.login);
    return this;
  }

  fillUsername(username: string): this {
    this.elements.usernameInput().clear().type(username);
    return this;
  }

  fillPassword(password: string): this {
    // `log: false` avoids leaking credentials into the Cypress command log.
    this.elements.passwordInput().clear().type(password, { log: false });
    return this;
  }

  submit(): this {
    this.elements.loginButton().click();
    return this;
  }

  login(user: User): this {
    return this.fillUsername(user.username).fillPassword(user.password).submit();
  }

  expectErrorContains(message: string): this {
    this.elements.errorMessage().should('be.visible').and('contain.text', message);
    return this;
  }
}

export default new LoginPage();
