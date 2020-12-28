const jwt = require('jsonwebtoken');
const ioc = require('../../ioc');
const AuthenticatedRequestUser = require('./AuthenticatedRequestUser');
const AuthenticatedRequestClient = require('./AuthenticatedRequestClient');
const { InvalidRequestError, InvalidTokenError } = require('oauth2-server');

const envionment = require('../../../../config/environment');

// See https://oauth2-server.readthedocs.io/en/latest/model/spec.html for what you can do with this

const GRANT_TYPES = {
  AUTHORIZATION_CODE: 'authorization_code',
  CLIENT_CREDENTIALS: 'client_credentials',
  PASSWORD: 'password',
  REFRESH_TOKEN: 'refresh_token'
}

/* Access token management */

// https://oauth2-server.readthedocs.io/en/latest/model/spec.html#model-getclient
async function getClient(clientId) {
  return {
    clientId,
    clientSecret: null,
    grants: [GRANT_TYPES.PASSWORD, GRANT_TYPES.REFRESH_TOKEN],
    redirectUris: null,
  };
}

// https://oauth2-server.readthedocs.io/en/latest/model/spec.html#model-getUser
async function getUser(username, password) {
  const accountRepository = ioc.container.get('accountRepository');
  const encryption = ioc.container.get('encryption');

  const account = await accountRepository.findAccountWithEncryptedPasswordByUsername(username);

  if (!account) {
    throw new InvalidRequestError('Invalid request: username is invalid');
  }

  const isMatching = await encryption.compare(password, account.encryptedPassword);
  if (!isMatching) {
    throw new InvalidRequestError('Invalid request: password is invalid');
  }

  return account;
}

// https://oauth2-server.readthedocs.io/en/latest/model/spec.html#model-generateaccesstoken
async function generateAccessToken(client, user) {

  // Ignore client

  const claims = {
    iss: client.id,
    sub: user.id,
    preferred_username: user.username,
    email: user.email
  }
  return jwt.sign(claims, envionment.oauth.jwtSecret, { expiresIn: '1h' });
}

// https://oauth2-server.readthedocs.io/en/latest/model/spec.html#model-generaterefreshtoken
async function generateRefreshToken(client, user) {

  // Ignore client
  const claims = {
    iss: client.id,
    sub: user.id,
    preferred_username: user.username,
    email: user.email
  }
  return jwt.sign(claims, envionment.oauth.jwtSecret, { expiresIn: '15d' });
}

// https://oauth2-server.readthedocs.io/en/latest/model/spec.html#model-savetoken
async function saveToken(token, client, user) {
  return {
    accessToken: token.accessToken,
    accessTokenExpiresAt: token.accessTokenExpiresAt,
    refreshToken: token.refreshToken, // NOTE this is only needed if you need refresh tokens down the line
    refreshTokenExpiresAt: token.refreshTokenExpiresAt,
    client: client,
    user: user,
  };
}

/* Refresh token management */

// https://oauth2-server.readthedocs.io/en/latest/model/spec.html#model-getrefreshtoken
async function getRefreshToken(refreshToken) {
  const decoded = await jwt.verify(refreshToken, envionment.oauth.jwtSecret);

  const client = new AuthenticatedRequestClient({
    id: decoded.iss
  });

  const user = new AuthenticatedRequestUser({
    id: decoded.sub,
    username: decoded.preferred_username,
    email: decoded.email
  });

  return { refreshToken, client, user };
}

// https://oauth2-server.readthedocs.io/en/latest/model/spec.html#revoketoken-token-callback
async function revokeToken(token) {
  return true;
}

/* Request authentication */

// https://oauth2-server.readthedocs.io/en/latest/model/spec.html#model-getaccesstoken
async function getAccessToken(accessToken) {
  const decoded = await jwt.verify(accessToken, envionment.oauth.jwtSecret);

  const accountRepository = ioc.container.get('accountRepository');

  const isExistingAndActiveAccount = await accountRepository.existsById(decoded.sub);
  if (!isExistingAndActiveAccount) {
    throw new InvalidTokenError('Invalid token: user is invalid');
  }

  const user = new AuthenticatedRequestUser({
    id: decoded.sub,
    username: decoded.preferred_username,
    email: decoded.email
  });

  const client = new AuthenticatedRequestClient({
    id: decoded.iss
  });

  const accessTokenExpiresAt = new Date(decoded.exp * 1000);

  return { accessToken, client, accessTokenExpiresAt, user };
}

module.exports = {

  GRANT_TYPES,

  getClient,
  getUser,
  generateAccessToken,
  generateRefreshToken,
  saveToken,
  getRefreshToken,
  revokeToken,
  getAccessToken,
}
