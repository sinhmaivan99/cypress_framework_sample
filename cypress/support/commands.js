import LoginPage from '../pages/LoginPage'

Cypress.Commands.add('login', (username, password) => {
  LoginPage.visit()
  LoginPage.login(username, password)
})
