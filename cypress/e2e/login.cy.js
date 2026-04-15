import LoginPage from '../pages/LoginPage'

describe('SauceDemo Login Tests', () => {
  beforeEach(() => {
    cy.fixture('auth/users').as('data')
  })

  it('Login thành công với user hợp lệ', function () {
    cy.loginBySession(this.data.validUser.username, this.data.validUser.password)
    cy.visit('/inventory.html')
    cy.url().should('include', '/inventory.html')
  })

  it('Login thất bại với user sai thông tin', function () {
    cy.login(this.data.invalidUser.username, this.data.invalidUser.password)
    LoginPage.elements.errorMessage().should('be.visible')
      .and('contain.text', 'Username and password do not match')
  })

  it('Login thất bại với user bị khóa', function () {
    cy.login(this.data.lockedUser.username, this.data.lockedUser.password)
    LoginPage.elements.errorMessage().should('be.visible')
      .and('contain.text', 'Sorry, this user has been locked out.')
  })
})
