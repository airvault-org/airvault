const useCases = require('../../../application');
const { ApplicationError } = require('../../../application/errors');

module.exports = [{
  method: 'POST',
  url: '/accounts',
  handler: async function(request, reply) {
    const params = request.body;
    try {
      const account = await useCases.createAccount(params, this.container);
      reply.code(201).send(account);
    } catch (err) {
      if (err instanceof ApplicationError) {
        reply.code(400).send({
          "statusCode": 400,
          "code": "400",
          "error": "Bad request",
          "message": `Application error: ${err.message}`
        });
      }
    }
  },
}];
