/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to log in via UI (dùng cho negative test cases).
     * @param username - Tên đăng nhập
     * @param password - Mật khẩu
     * @example cy.login('standard_user', 'secret_sauce')
     */
    login(username: string, password: string): Chainable<void>;

    /**
     * Custom command to log in via cy.session (session được cache — dùng cho test cần đăng nhập sẵn).
     * @param username - Tên đăng nhập
     * @param password - Mật khẩu
     * @example cy.loginBySession('standard_user', 'secret_sauce')
     */
    loginBySession(username: string, password: string): Chainable<void>;
  }
}
