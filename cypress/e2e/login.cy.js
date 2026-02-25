import LoginPage from '../pages/loginPage'

describe('SauceDemo Login Tests', () => {
  beforeEach(() => {
    cy.fixture('users').as('data')
  })

  it('Login thành công với user hợp lệ', function () {
    cy.login(this.data.validUser.username, this.data.validUser.password)
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
