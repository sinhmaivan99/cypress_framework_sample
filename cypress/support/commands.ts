import LoginPage from '../pages/LoginPage';

Cypress.Commands.add('login', (username: string, password: string) => {
  LoginPage.visit();
  LoginPage.login(username, password);
});

Cypress.Commands.add('loginBySession', (username: string, password: string) => {
  cy.session(
    [username],
    () => {
      LoginPage.visit();
      LoginPage.login(username, password);
      cy.url().should('include', '/inventory.html');
    },
    {
      validate: () => {
        cy.visit('/inventory.html');
        cy.url().should('include', '/inventory.html');
      },
    }
  );
});
