const useCases = require('../../../application');

module.exports = function(fastify, options, done) {

  fastify.route({
    method: 'GET',
    url: '/vaults',
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

  fastify.register((instance, opts, done) => {

    instance.addHook('preValidation', (request, reply, done) => {
      // TODO check that authenticated user can access vault
      done();
    });

    instance.route({
      method: 'GET',
      url: '/',
      handler: async function(request, reply) {
        const ownerId = request.user.id;
        const params = { id: parseInt(request.params.id), accountId: ownerId };
        const vault = await useCases.getVault(params, this.container);

        if (vault) {
          reply.code(200).send(vault);
        } else {
          reply.code(404).send({
            "statusCode": 404,
            "code": "404",
            "error": "Resource not found",
          });
        }
      },
    });

    instance.route({
      method: 'PATCH',
      url: '/',
      handler: async function(request, reply) {
        const params = Object.assign({}, request.body, { id: parseInt(request.params.id) });
        const vault = await useCases.updateVault(params, this.container);
        reply.code(200).send(vault);
      },
    });

    instance.route({
      method: 'DELETE',
      url: '/',
      handler: async function(request, reply) {
        const params = { id: parseInt(request.params.id) };
        await useCases.deleteVault(params, this.container);
        reply.code(204).send(null);
      },
    });

    instance.route({
      method: 'GET',
      url: '/items',
      handler: async function(request, reply) {
        const params = { vaultId: parseInt(request.params.id) };
        const items = await useCases.getVaultItems(params, this.container);
        reply.code(200).send(items);
      },
    });

    instance.route({
      method: 'POST',
      url: '/items',
      handler: async function(request, reply) {
        const params = Object.assign({}, request.body, { vaultId: parseInt(request.params.id) });
        const item = await useCases.createItem(params, this.container);
        reply.code(201).send(item);
      },
    });

    done();
  }, { prefix: '/vaults/:id' });

  done();
};
