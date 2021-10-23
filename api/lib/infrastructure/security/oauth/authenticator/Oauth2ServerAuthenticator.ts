import OAuth2Server, { Request, Response } from 'oauth2-server';
import { Authenticator } from './Authenticator';
import { FastifyReply, FastifyRequest } from 'fastify';

class Oauth2ServerAuthenticator implements Authenticator {

  private oauth2Server;

  constructor(authenticatorModel: any) {
    this.oauth2Server = new OAuth2Server({
      model: authenticatorModel
    });
  }

  async token(request: FastifyRequest, reply: FastifyReply) {
    const oauthRequest = new Request(request);
    const oauthResponse = new Response();
    const oauthOptions = {
      requireClientAuthentication: {
        password: false,
        refresh_token: false,
      }
    };
    await this.oauth2Server.token(oauthRequest, oauthResponse, oauthOptions);
    reply
      .code(oauthResponse.status || 200)
      .headers(oauthResponse.headers || {})
      .send(oauthResponse.body);
  }

  async authenticate(request: FastifyRequest) {
    const oauthRequest = new Request(request);
    const oauthResponse = new Response();
    const oauthOptions = {};
    const oauthToken = await this.oauth2Server.authenticate(oauthRequest, oauthResponse, oauthOptions);
    request.user = oauthToken.user;
    return oauthToken;
  }

}

export { Oauth2ServerAuthenticator };
