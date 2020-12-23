const createItem = require('../../../application/commands/create-item');

module.exports = [{
  method: 'GET',
  url: '/vaults/overview',
  handler: async function(request, reply) {
    // TODO
    this.log.info('Returns an overview of the list of your vaults.');
    reply.code(501).send('Not yet implemented');
  },
}, {
  method: 'POST',
  url: '/vaults',
  handler: async function(request, reply) {
    // TODO
    this.log.info('Creates a new vault.');
    reply.code(501).send('Not yet implemented');
  },
}, {
  method: 'GET',
  url: '/vaults/:id',
  handler: async function(request, reply) {
    // TODO
    this.log.info('Retrieves the details of an existing vault.');
    reply.code(501).send('Not yet implemented');
  },
}, {
  method: 'PATCH',
  url: '/vaults',
  handler: async function(request, reply) {
    // TODO
    this.log.info('Updates your vault.');
    reply.code(501).send('Not yet implemented');
  },
}, {
  method: 'DELETE',
  url: '/vaults/:id',
  handler: async function(request, reply) {
    // TODO
    this.log.info('Deletes your vault.');
    reply.code(501).send('Not yet implemented');
  },
}, {
  method: 'GET',
  url: '/vaults/:id/items/overview',
  handler: async function(request, reply) {
    // TODO
    this.log.info('Returns an overview of the list of items for a given vault.');
    reply.code(501).send('Not yet implemented');
  },
}, {
  method: 'POST',
  url: '/vaults/:id/items',
  handler: async function(request, reply) {
    const params = {
      vaultId: request.params.id,
      username: request.body.username,
      password: request.body.password,
      website: request.body.website,
    };
    return createItem(params, this.container);
  },
}];
