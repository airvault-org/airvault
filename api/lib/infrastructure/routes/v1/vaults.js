const useCases = require('../../../application');

module.exports = function(fastify, options, done) {

  fastify.route({
    method: 'GET',
    url: '/vaults',
    authenticated: true,
    handler: async function(request, reply) {
      const ownerId = request.user.id;
      const vaults = await useCases.listVaults({ ownerId }, this.container);
      return reply.code(200).send(vaults);
    },
  });

  fastify.route({
    method: 'POST',
    url: '/vaults',
    handler: async function(request, reply) {
      const ownerId = request.user.id;
      const params = { accountId: ownerId, name: request.body.name };
      const vault = await useCases.createVault(params, this.container);
      reply.code(201).send(vault);
    },
  });

  fastify.route({
    method: 'GET',
    url: '/vaults/:id',
    handler: async function(request, reply) {
      const params = { id: request.params.id };
      const vault = await useCases.getVault(params, this.container);
      reply.code(200).send(vault);
    },
  });

  fastify.route({
    method: 'PATCH',
    url: '/vaults/:id',
    handler: async function(request, reply) {
      const params = Object.assign({}, request.body, request.params);
      const vault = await useCases.updateVault(params, this.container);
      reply.code(200).send(vault);
    },
  });

  fastify.route({
    method: 'DELETE',
    url: '/vaults/:id',
    handler: async function(request, reply) {
      const params = { id: request.params.id };
      await useCases.deleteVault(params, this.container);
      reply.code(204).send(null);
    },
  });

  fastify.route({
    method: 'GET',
    url: '/vaults/:id/items',
    handler: async function(request, reply) {
      const params = { vaultId: parseInt(request.params.id) };
      const items = await useCases.getVaultItems(params, this.container);
      reply.code(200).send(items);
    },
  });

  fastify.route({
    method: 'POST',
    url: '/vaults/:id/items',
    handler: async function(request, reply) {
      const params = Object.assign({}, request.body, { vaultId: request.params.id });
      const item = await useCases.createItem(params, this.container);
      reply.code(201).send(item);
    },
  });

  done();
};
