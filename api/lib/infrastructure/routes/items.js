const findItems = require('../../application/queries/find-items');
const createItem = require('../../application/commands/create-item');
const updateItem = require('../../application/commands/update-item');
const deleteItem = require('../../application/commands/delete-item');

module.exports = [{
  method: 'GET',
  url: '/items',
  handler: async function(request, reply) {
    return findItems(this.container);
  },
}, {
  method: 'POST',
  url: '/items',
  handler: async function(request, reply) {
    const params = request.body;
    return createItem(params, this.container);
  },
}, {
  method: 'PATCH',
  url: '/items/:id',
  handler: async function(request, reply) {
    const params = request.body;
    params.id = request.params.id;
    return updateItem(params, this.container);
  },
}, {
  method: 'DELETE',
  url: '/items/:id',
  handler: async function(request, reply) {
    return deleteItem({ id: request.params.id }, this.container);
  },
}];
