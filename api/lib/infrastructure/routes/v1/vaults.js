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
      return vaultSerializer.serialize(vaultSummaryList);
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
      reply.statusCode = 201;
      return serialized;
    },
  });

  fastify.register((instance, opts, done) => {

    instance.addHook('preValidation', async (request, reply) => {
      const vaultUuid = request.params.uuid;
      const ownerId = request.user.id;
      const vaultRepository = fastify.container.get('vaultRepository');
      const isExisting = await vaultRepository.existsByUuidAndAccountId(vaultUuid, ownerId);
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
        const params = { vaultUuid: request.params.uuid, accountId: ownerId };
        const vault = await useCases.getVault(params, this.container);
        return vaultSerializer.serialize(vault);
      },
    });

    instance.route({
      method: 'PATCH',
      url: '/',
      handler: async function(request, reply) {
        const params = Object.assign({}, request.body, { uuid: request.params.uuid });
        const vault = await useCases.updateVault(params, this.container);
        return vaultSerializer.serialize(vault);
      },
    });

    instance.route({
      method: 'DELETE',
      url: '/',
      handler: async function(request, reply) {
        const params = { uuid: request.params.uuid };
        await useCases.deleteVault(params, this.container);
        reply.statusCode = 204;
      },
    });

    instance.route({
      method: 'GET',
      url: '/items',
      handler: async function(request, reply) {
        const params = { vaultUuid: request.params.uuid };
        const itemList = await useCases.getVaultItems(params, this.container);
        return itemSerializer.serialize(itemList.entities);
      },
    });

    instance.route({
      method: 'POST',
      url: '/items',
      handler: async function(request, reply) {
        const params = Object.assign({}, request.body, { vaultUuid: request.params.uuid });
        const item = await useCases.createItem(params, this.container);
        const serialized = itemSerializer.serialize(item);
        reply.statusCode = 201;
        return serialized;
      },
    });

    done();
  }, { prefix: '/vaults/:uuid' });

  done();
};
