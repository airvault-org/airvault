const useCases = require('../../../application');

module.exports = function(fastify, options, done) {

  fastify.route({
    method: 'GET',
    url: '/items',
    handler: async function(request, reply) {
      return useCases.findItems(this.container);
    },
  });

  fastify.route({
    method: 'GET',
    url: '/items/:id',
    handler: async function(request, reply) {
      // TODO
      this.log.info('Retrieves the details of an existing item.');
      reply.code(501).send('Not yet implemented');
    },
  });

  fastify.route({
    method: 'PATCH',
    url: '/items/:id',
    handler: async function(request, reply) {
      const params = request.body;
      params.id = request.params.id;
      return useCases.updateItem(params, this.container);
    },
  });

  fastify.route({
    method: 'DELETE',
    url: '/items/:id',
    handler: async function(request, reply) {
      return useCases.deleteItem({ id: request.params.id }, this.container);
    },
  });

  done();
};

