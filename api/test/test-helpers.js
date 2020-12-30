const { IocContainer } = require('../lib/infrastructure/ioc');
const Authenticator = require('../lib/infrastructure/security/oauth/authenticator/Authenticator');
const app = require('../lib/infrastructure/app');

class TestAuthenticator extends Authenticator {

  token(request, reply) {
    const response = {
      "access_token": "access.token",
      "token_type": "Bearer",
      "expires_in": 3599,
      "refresh_token": "refresh.token"
    };
    reply.code(200).send(response);
  }

  authenticate(request) {
    request.user = { id: 1 };
  }
}

function getTestServer(opts = {}) {
  const container = new IocContainer();
  container.register('authenticator', new TestAuthenticator());

  const options = Object.assign({}, opts, { container });

  const fastify = app(options);
  return fastify;
}


module.exports = {
  getTestServer
};
