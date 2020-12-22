const createAccount = require('../../application/commands/create-account');

module.exports = [{
  method: 'POST',
  url: '/accounts',
  handler: async function(request, reply) {
    const params = request.body;
    return createAccount(params, this.container);
  },
}];
