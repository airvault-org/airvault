module.exports = function(fastify, options, done) {
  fastify.route({
    method: 'GET',
    url: '/',
    config: {
      authentication: false
    },
    handler: async function(request, reply) {
      return { hello: 'world' };
    },
  });

  done();
};
