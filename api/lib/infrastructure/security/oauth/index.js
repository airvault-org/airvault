const fp = require('fastify-plugin');
const authenticator = require('./authenticator');

module.exports = fp(function(fastify, opts, done) {

  // https://github.com/fastify/fastify-auth
  fastify.register(require('fastify-auth'));

  fastify.addHook('onRequest', (request, reply, done) => {
    request.user = {};
    done();
  });

  fastify.decorate("authenticate", async function(request, reply) {
    if (request.context.config.authentication === false) {
      return;
    }
    await authenticator.authenticate(request, reply);
  });

  fastify.after((request, reply, done) => {

    fastify.addHook('preValidation', fastify.auth([fastify.authenticate]));

    fastify.route({
      method: 'POST',
      url: '/token',
      config: {
        authentication: false
      },
      handler: async function(request, reply) {
        try {
          await authenticator.token(request, reply);
        } catch (error) {
          this.log.error(error);
          throw error;
        }
      },
    });

    done();
  });

  done();
}, '3.x');
