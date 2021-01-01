const useCases = require('../../../application');

module.exports = function(fastify, options, done) {

  fastify.route({
    method: 'GET',
    url: '/items',
    handler: async function(request, reply) {
      const itemList = await useCases.findItems(this.container);
      return reply.code(200).send(itemList);
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
      const item = await useCases.updateItem(params, this.container);
      return reply.code(200).send(item);
    },
  });

  fastify.route({
    method: 'DELETE',
    url: '/items/:id',
    handler: async function(request, reply) {
      await useCases.deleteItem({ id: request.params.id }, this.container);
      return reply.code(204).send();
    },
  });

  done();
};

