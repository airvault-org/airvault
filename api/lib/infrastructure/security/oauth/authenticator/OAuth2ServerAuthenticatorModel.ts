import jwt, { JwtPayload } from 'jsonwebtoken';
import { AuthenticatedRequestUser } from './AuthenticatedRequestUser';
import { AuthenticatedRequestClient } from './AuthenticatedRequestClient';
import { InvalidRequestError, InvalidTokenError } from 'oauth2-server';
import { environment } from '../../../../../config/environment';
import { AccountRepository } from '../../../../domain/AccountRepository';
import { Encryption } from '../../Encryption';

// See https://oauth2-server.readthedocs.io/en/latest/model/spec.html for what you can do with this

const GRANT_TYPES = {
  AUTHORIZATION_CODE: 'authorization_code',
  CLIENT_CREDENTIALS: 'client_credentials',
  PASSWORD: 'password',
  REFRESH_TOKEN: 'refresh_token'
}

class OAuth2ServerAuthenticatorModel {

  #accountRepository;
  #encryption;

  constructor({accountRepository, encryption}: { accountRepository: AccountRepository, encryption: Encryption }) {
    this.#accountRepository = accountRepository;
    this.#encryption = encryption;
  }

  /* Access token management */

// https://oauth2-server.readthedocs.io/en/latest/model/spec.html#model-getclient
  async getClient(clientId: any) {
    return {
      clientId,
      clientSecret: null,
      grants: [GRANT_TYPES.PASSWORD, GRANT_TYPES.REFRESH_TOKEN],
      redirectUris: null,
    };
  }

// https://oauth2-server.readthedocs.io/en/latest/model/spec.html#model-getUser
  async getUser(username: string, password: string) {
    const account = await this.#accountRepository.findAccountWithEncryptedPasswordByEmail(username);

    if (!account) {
      throw new InvalidRequestError('Invalid request: username (email) is invalid');
    }

    const isMatching = await this.#encryption.compare(password, account.encryptedPassword);
    if (!isMatching) {
      throw new InvalidRequestError('Invalid request: password is invalid');
    }

    return account;
  }

  // https://oauth2-server.readthedocs.io/en/latest/model/spec.html#model-generateaccesstoken
  generateAccessToken(client: any, user: any) {

    // Ignore client

    const claims = {
      iss: client.clientId,
      sub: user.id,
      preferred_username: user.username,
      email: user.email
    }
    return jwt.sign(claims, environment.oauth.jwtSecret, {expiresIn: '1h'});
  }

  // https://oauth2-server.readthedocs.io/en/latest/model/spec.html#model-generaterefreshtoken
  generateRefreshToken(client: any, user: any) {

    // Ignore client
    const claims = {
      iss: client.clientId,
      sub: user.id,
      preferred_username: user.username,
      email: user.email
    }
    return jwt.sign(claims, environment.oauth.jwtSecret, {expiresIn: '15d'});
  }

  // https://oauth2-server.readthedocs.io/en/latest/model/spec.html#model-savetoken
  saveToken(token: any, client: any, user: any) {
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
  async getRefreshToken(refreshToken: any) {
    const decoded = await jwt.verify(refreshToken, environment.oauth.jwtSecret) as JwtPayload;

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
  async revokeToken() {
    return true;
  }

  /* Request authentication */

// https://oauth2-server.readthedocs.io/en/latest/model/spec.html#model-getaccesstoken
  async getAccessToken(accessToken: any) {
    let decoded;
    try {
      decoded = jwt.verify(accessToken, environment.oauth.jwtSecret) as JwtPayload;
    } catch (err) {
      throw new InvalidTokenError('Access token expired');
    }

    const isExistingAndActiveAccount = await this.#accountRepository.existsById(decoded.sub);
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

    // @ts-ignore
    const accessTokenExpiresAt = new Date(decoded.exp * 1000);

    return { accessToken, client, accessTokenExpiresAt, user };
  }

}

export { OAuth2ServerAuthenticatorModel };
