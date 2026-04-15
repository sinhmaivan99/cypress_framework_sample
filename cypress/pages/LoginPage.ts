class LoginPage {
  elements = {
    usernameInput: (): Cypress.Chainable<JQuery<HTMLElement>> =>
      cy.get('[data-test="username"]').or('#user-name'),
    passwordInput: (): Cypress.Chainable<JQuery<HTMLElement>> =>
      cy.get('[data-test="password"]').or('#password'),
    loginButton: (): Cypress.Chainable<JQuery<HTMLElement>> =>
      cy.get('[data-test="login-button"]').or('#login-button'),
    errorMessage: (): Cypress.Chainable<JQuery<HTMLElement>> =>
      cy.get('[data-test="error"]'),
  };

  visit(): void {
    cy.visit('/');
  }

  typeUsername(username: string): void {
    this.elements.usernameInput().clear().type(username);
  }

  typePassword(password: string): void {
    this.elements.passwordInput().clear().type(password);
  }

  clickLogin(): void {
    this.elements.loginButton().click();
  }

  login(username: string, password: string): void {
    this.typeUsername(username);
    this.typePassword(password);
    this.clickLogin();
  }
}

export default new LoginPage();
