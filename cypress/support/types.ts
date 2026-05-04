/**
 * Shared domain types used across specs, page objects and custom commands.
 */

export interface User {
  username: string;
  password: string;
}

export interface UsersFixture {
  validUser: User;
  lockedUser: User;
  invalidUser: User;
}

export type FixturePath = 'auth/users';
