const jwt = require('jsonwebtoken');
const ioc = require('../../ioc');
const envionment = require('../../../../config/environment');

// See https://oauth2-server.readthedocs.io/en/latest/model/spec.html for what you can do with this
const db = { // Here is a fast overview of what your db model should look like
  authorizationCode: {
    authorizationCode: '', // A string that contains the code
    expiresAt: new Date(), // A date when the code expires
    redirectUri: '', // A string of where to redirect to with this code
    client: null, // See the client section
    user: null, // Whatever you want... This is where you can be flexible with the protocol
  },
  client: { // Application wanting to authenticate with this server
    clientId: '', // Unique string representing the client
    clientSecret: '', // Secret of the client; Can be null
    grants: [], // Array of grants that the client can use (ie, `authorization_code`)
    redirectUris: [], // Array of urls the client is allowed to redirect to
  },
  token: {
    accessToken: '', // Access token that the server created
    accessTokenExpiresAt: new Date(), // Date the token expires
    client: null, // Client associated with this token
    user: null, // User associated with this token
  },
}

/* Grant types */

const GRANT_TYPES = {
  AUTHORIZATION_CODE: 'authorization_code',
  CLIENT_CREDENTIALS: 'client_credentials',
  PASSWORD: 'password',
  REFRESH_TOKEN: 'refresh_token,'
}

// https://oauth2-server.readthedocs.io/en/latest/model/spec.html#model-getclient
async function getClient(clientId, clientSecret) {
  return {
    clientId,
    clientSecret: null,
    grants: [GRANT_TYPES.PASSWORD, GRANT_TYPES.REFRESH_TOKEN],
    redirectUris: null,
  };
}

// https://oauth2-server.readthedocs.io/en/latest/model/spec.html#model-getUser
async function getUser(username, password) {
  const accountRepository = await ioc.container.get('accountRepository');
  const encryption = await ioc.container.get('encryption');

  const account = await accountRepository.findAccountWithEncryptedPasswordByUsername(username);

  if (!account) {
    throw new Error('Security error: bad username');
  }

  const isMatching = await encryption.compare(password, account.encryptedPassword);
  if (!isMatching) {
    throw new Error('Security error: wrong password');
  }

  return account;
}

// https://oauth2-server.readthedocs.io/en/latest/model/spec.html#model-generateaccesstoken
async function generateAccessToken(client, user, scope) {

  // Ignore client

  const claims = {
    iss: 'webapp',
    sub: user.id,
    preferred_username: user.username,
    email: user.email
  }
  return jwt.sign(claims, envionment.oauth.jwtSecret, {expiresIn: '1h'});
}

// https://oauth2-server.readthedocs.io/en/latest/model/spec.html#model-generaterefreshtoken
async function generateRefreshToken(client, user, scope) {

  // Ignore client
  const claims = {
    iss: 'webapp',
    sub: user.id,
    preferred_username: user.username,
    email: user.email
  }
  return jwt.sign(claims, envionment.oauth.jwtSecret, {expiresIn: '15d'});
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

/* Request authentication */

// https://oauth2-server.readthedocs.io/en/latest/model/spec.html#model-getaccesstoken
async function getAccessToken(accessToken) {

}

// https://oauth2-server.readthedocs.io/en/latest/model/spec.html#model-verifyscope
async function verifyScope(accessToken, scope) {

}

module.exports = {

  GRANT_TYPES,

  getClient,
  getUser,
  generateAccessToken,
  generateRefreshToken,
  saveToken,
  getAccessToken,
  verifyScope
}
