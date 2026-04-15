import LoginPage from '../pages/LoginPage';

interface UserData {
  username: string;
  password: string;
}

interface UsersFixture {
  validUser: UserData;
  lockedUser: UserData;
  invalidUser: UserData;
}

describe('SauceDemo Login Tests', () => {
  beforeEach(() => {
    cy.fixture<UsersFixture>('auth/users').as('data');
  });

  it('Login thành công với user hợp lệ', function () {
    const data = this.data as UsersFixture;
    cy.loginBySession(data.validUser.username, data.validUser.password);
    cy.visit('/inventory.html');
    cy.url().should('include', '/inventory.html');
  });

  it('Login thất bại với user sai thông tin', function () {
    const data = this.data as UsersFixture;
    cy.login(data.invalidUser.username, data.invalidUser.password);
    LoginPage.elements
      .errorMessage()
      .should('be.visible')
      .and('contain.text', 'Username and password do not match');
  });

  it('Login thất bại với user bị khóa', function () {
    const data = this.data as UsersFixture;
    cy.login(data.lockedUser.username, data.lockedUser.password);
    LoginPage.elements
      .errorMessage()
      .should('be.visible')
      .and('contain.text', 'Sorry, this user has been locked out.');
  });
});
