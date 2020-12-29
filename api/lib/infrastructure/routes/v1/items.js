const findItems = require('../../../application/queries/find-items');
const updateItem = require('../../../application/commands/update-item');
const deleteItem = require('../../../application/commands/delete-item');

module.exports = function(fastify, options, done) {

  fastify.route({
    method: 'GET',
    url: '/items',
    handler: async function(request, reply) {
      return findItems(this.container);
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
      return updateItem(params, this.container);
    },
  });

  fastify.route({
    method: 'DELETE',
    url: '/items/:id',
    handler: async function(request, reply) {
      return deleteItem({ id: request.params.id }, this.container);
    },
  });

  done();
};

