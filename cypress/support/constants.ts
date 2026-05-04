/**
 * Centralized routes and well-known UI strings.
 * Keeping them here avoids magic strings scattered across specs.
 */

export const Routes = {
  login: '/',
  inventory: '/inventory.html',
} as const;

export const LoginErrors = {
  invalidCredentials: 'Username and password do not match any user in this service',
  lockedOut: 'Sorry, this user has been locked out.',
} as const;
