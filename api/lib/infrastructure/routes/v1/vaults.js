const useCases = require('../../../application');

module.exports = [{
  method: 'GET',
  url: '/vaults',
  handler: async function(request, reply) {
    const vaults = await useCases.listVaults(this.container);
    reply.code(200).send(vaults);
  },
}, {
  method: 'POST',
  url: '/vaults',
  handler: async function(request, reply) {
    const params = request.body;
    const vault = await useCases.createVault(params, this.container);
    reply.code(201).send(vault);
  },
}, {
  method: 'GET',
  url: '/vaults/:id',
  handler: async function(request, reply) {
    const params = { id: request.params.id };
    const vault = await useCases.getVault(params, this.container);
    reply.code(200).send(vault);
  },
}, {
  method: 'PATCH',
  url: '/vaults/:id',
  handler: async function(request, reply) {
    const params = Object.assign({}, request.body, request.params);
    const vault = await useCases.updateVault(params, this.container);
    reply.code(200).send(vault);
  },
}, {
  method: 'DELETE',
  url: '/vaults/:id',
  handler: async function(request, reply) {
    const params = { id: request.params.id };
    await useCases.deleteVault(params, this.container);
    reply.code(204).send(null);
  },
}, {
  method: 'GET',
  url: '/vaults/:id/items',
  handler: async function(request, reply) {
    const params = { vaultId: parseInt(request.params.id) };
    const items = await useCases.getVaultItems(params, this.container);
    reply.code(200).send(items);
  },
}, {
  method: 'POST',
  url: '/vaults/:id/items',
  handler: async function(request, reply) {
    const params = Object.assign({}, request.body, { vaultId: request.params.id });
    const item = await useCases.createItem(params, this.container);
    reply.code(201).send(item);
  },
}];
