import LoginPage from '../pages/LoginPage'

describe('SauceDemo Login Tests', () => {
  beforeEach(() => {
    cy.fixture('users').as('usersData')
  })

  it('Login thành công với user hợp lệ', function () {
    cy.login(this.usersData.validUser.username, this.usersData.validUser.password)
    cy.url().should('include', '/inventory.html')
  })

  it('Login thất bại với user sai thông tin', function () {
    cy.login(this.usersData.invalidUser.username, this.usersData.invalidUser.password)
    LoginPage.elements.errorMessage().should('be.visible')
      .and('contain.text', 'Username and password do not match')
  })

  it('Login thất bại với user bị khóa', function () {
    cy.login(this.usersData.lockedUser.username, this.usersData.lockedUser.password)
    LoginPage.elements.errorMessage().should('be.visible')
      .and('contain.text', 'Sorry, this user has been locked out.')
  })
})
