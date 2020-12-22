const findPasses = require('../../application/queries/find-passes');
const createPass = require('../../application/commands/create-pass');
const deletePass = require('../../application/commands/delete-pass');

module.exports = [{
  method: 'GET',
  url: '/passes',
  handler: async function(request, reply) {
    return findPasses(this.container);
  },
}, {
  method: 'POST',
  url: '/passes',
  handler: async function(request, reply) {
    const params = request.body;
    return createPass(params, this.container);
  },
}, {
  method: 'DELETE',
  url: '/passes/:id',
  handler: async function(request, reply) {
    return deletePass({ id: request.params.id }, this.container);
  },
}];
