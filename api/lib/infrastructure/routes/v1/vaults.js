const useCases = require('../../../application');
const vaultSerializer = require('../../serializers/vault-serializer');
const itemSerializer = require('../../serializers/item-serializer');

module.exports = function(fastify, options, done) {

  fastify.route({
    method: 'GET',
    url: '/vaults',
    handler: async function(request, reply) {
      const ownerId = request.user.id;
      const vaultSummaryList = await useCases.listVaults({ ownerId }, this.container);
      const serialized = vaultSerializer.serialize(vaultSummaryList);
      return reply.code(200).send(serialized);
    },
  });

  fastify.route({
    method: 'POST',
    url: '/vaults',
    handler: async function(request, reply) {
      const ownerId = request.user.id;
      const params = { accountId: ownerId, name: request.body.name };
      const vault = await useCases.createVault(params, this.container);
      const serialized = vaultSerializer.serialize(vault);
      reply.code(201).send(serialized);
    },
  });

  fastify.register((instance, opts, done) => {

    instance.addHook('preValidation', async (request, reply) => {
      const vaultId = parseInt(request.params.id);
      const ownerId = request.user.id;
      const vaultRepository = fastify.container.get('vaultRepository');
      const isExisting = await vaultRepository.existsByIdAndAccountId(vaultId, ownerId);
      if (!isExisting) {
        reply.code(404).send({
          "statusCode": 404,
          "code": "404",
          "error": "Resource not found",
        });
      }
    });

    instance.route({
      method: 'GET',
      url: '/',
      handler: async function(request, reply) {
        const ownerId = request.user.id;
        const params = { id: parseInt(request.params.id), accountId: ownerId };
        const vault = await useCases.getVault(params, this.container);
        const serialized = vaultSerializer.serialize(vault);
        reply.code(200).send(serialized);
      },
    });

    instance.route({
      method: 'PATCH',
      url: '/',
      handler: async function(request, reply) {
        const params = Object.assign({}, request.body, { id: parseInt(request.params.id) });
        const vault = await useCases.updateVault(params, this.container);
        const serialized = vaultSerializer.serialize(vault);
        reply.code(200).send(serialized);
      },
    });

    instance.route({
      method: 'DELETE',
      url: '/',
      handler: async function(request, reply) {
        const params = { id: parseInt(request.params.id) };
        await useCases.deleteVault(params, this.container);
        reply.code(204).send();
      },
    });

    instance.route({
      method: 'GET',
      url: '/items',
      handler: async function(request, reply) {
        const params = { vaultId: parseInt(request.params.id) };
        const itemList = await useCases.getVaultItems(params, this.container);
        const serialized = itemSerializer.serialize(itemList.items);
        reply.code(200).send(serialized);
      },
    });

    instance.route({
      method: 'POST',
      url: '/items',
      handler: async function(request, reply) {
        const params = Object.assign({}, request.body, { vaultId: parseInt(request.params.id) });
        const item = await useCases.createItem(params, this.container);
        const serialized = itemSerializer.serialize(item);
        reply.code(201).send(serialized);
      },
    });

    done();
  }, { prefix: '/vaults/:id' });

  done();
};
