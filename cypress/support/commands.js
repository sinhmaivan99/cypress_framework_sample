import LoginPage from '../pages/loginPage'

Cypress.Commands.add('login', (username, password) => {
  LoginPage.visit()
  LoginPage.login(username, password)
})
