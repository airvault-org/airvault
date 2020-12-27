module.exports = [{
  method: 'GET',
  url: '/',
  handler: async function(request, reply) {
    return { hello: 'world' };
  },
}];
