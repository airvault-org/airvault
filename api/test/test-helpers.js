const { IocContainer } = require('../lib/infrastructure/ioc');
const app = require('../lib/infrastructure/app');

function getTestServer() {
  const container = new IocContainer();
  const fastify = app({ container, oauth: false });

  fastify.addHook('onRequest', (request, reply, done) => {
    request.user = { id: 1 };
    done();
  });

  return fastify;
}


module.exports = {
  getTestServer
};
