const OAuth2Server = require('oauth2-server');
const { Request, Response } = OAuth2Server;
const Authenticator = require('./Authenticator');

class Oauth2ServerAuthenticator extends Authenticator {

  #server;

  constructor(authenticatorModel) {
    super();
    this.#server = new OAuth2Server({
      model: authenticatorModel
    });
  }

  async token(request, reply) {
    const oauthRequest = new Request(request);
    const oauthResponse = new Response();
    const oauthOptions = {
      requireClientAuthentication: {
        password: false,
        refresh_token: false,
      }
    };
    await this.#server.token(oauthRequest, oauthResponse, oauthOptions);
    reply
      .code(oauthResponse.status)
      .headers(oauthResponse.headers)
      .send(oauthResponse.body);
  }

  async authenticate(request) {
    const oauthRequest = new Request(request);
    const oauthResponse = new Response();
    const oauthOptions = {};
    const oauthToken = await this.#server.authenticate(oauthRequest, oauthResponse, oauthOptions);
    request.user = oauthToken.user;
    return oauthToken;
  }

}

module.exports = Oauth2ServerAuthenticator;
