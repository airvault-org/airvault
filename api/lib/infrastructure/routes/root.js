module.exports = [{
  method: 'GET',
  url: '/',
  handler: async (request, reply) => {
    return { hello: 'world' };
  },
}];
