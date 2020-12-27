const authenticator = require('../security/oauth/authenticator');

module.exports = function (fastify, options, done) {

  fastify.route({
    method: 'POST',
    url: '/token',
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
};
