module.exports.messages = {
  notFound: (resource) => `${resource}-not-found`,
  alreadyExists: (param) => `${param}-already-registered`,
  invalidFields: 'invalid-fields',
  invalidPassword: 'invalid-password',
  emailUnavailable: 'email-unavailable',
  invalidAuthFormat: 'invalid-authorization-format',
  authMissing: 'missing-authorization-header',
  tokenExpired: 'token-expired',
  accessUnauthorized: 'access-unauthorized',
  internalError: 'internal-server-error'
}
