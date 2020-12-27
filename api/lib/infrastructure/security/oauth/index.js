const fp = require('fastify-plugin');
const authenticator = require('./authenticator');

module.exports = fp(function(fastify, opts, done) {

  // https://github.com/fastify/fastify-auth
  fastify.register(require('fastify-auth'));

  fastify.decorateRequest('user', {});

  fastify.decorate("authenticate", async function(request, reply) {
    if (request.context.config.authentication === false) {
      return;
    }
    await authenticator.authenticate(request, reply);
  });

  done();
}, '3.x');
