const useCases = require('../../../application');

module.exports = [{
  method: 'POST',
  url: '/accounts',
  handler: async function(request, reply) {
    const params = request.body;

    const account = await useCases.createAccount(params, this.container);

    reply
      .code(201)
      .send(account);
  },
}];
