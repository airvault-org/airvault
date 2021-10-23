import { IocContainer } from '../lib/infrastructure/ioc';
import { Authenticator } from '../lib/infrastructure/security/oauth/authenticator/Authenticator';
import build from '../lib/infrastructure/app';
import { FastifyReply, FastifyRequest } from 'fastify';
import { User } from 'oauth2-server';

declare module 'fastify' {
  interface FastifyInstance {
    container: any;

    authenticate(request: FastifyRequest, reply: FastifyReply): void;
  }

  interface FastifyRequest {
    user: User;
    context: any;
  }
}

class TestAuthenticator implements Authenticator {

  token(request: FastifyRequest<any>, reply: FastifyReply) {
    const response = {
      'access_token': 'access.token',
      'token_type': 'Bearer',
      'expires_in': 3599,
      'refresh_token': 'refresh.token'
    };
    reply.code(200).send(response);
  }

  authenticate(request: FastifyRequest<any>) {
    request.user = {id: 1};
  }
}

function getTestServer(opts = {}) {
  const container = new IocContainer();
  container.register('authenticator', new TestAuthenticator());

  const options = Object.assign({}, opts, {container});

  const fastify = build(options);
  return fastify;
}

export {
  getTestServer
};
