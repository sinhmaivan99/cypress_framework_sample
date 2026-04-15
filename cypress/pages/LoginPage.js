class LoginPage {
    elements = {
      usernameInput: () => cy.get('#user-name'),
      passwordInput: () => cy.get('#password'),
      loginButton: () => cy.get('#login-button'),
      errorMessage: () => cy.get('[data-test="error"]')
    }
  
    visit() {
      cy.visit('/')
    }
  
    typeUsername(username) {
      this.elements.usernameInput().clear().type(username)
    }
  
    typePassword(password) {
      this.elements.passwordInput().clear().type(password)
    }
  
    clickLogin() {
      this.elements.loginButton().click()
    }
  
    login(username, password) {
      this.typeUsername(username)
      this.typePassword(password)
      this.clickLogin()
    }
  }
  
  export default new LoginPage()
  