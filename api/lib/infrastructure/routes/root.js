module.exports = [{
  method: 'GET',
  url: '/',
  handler: async function(request, reply) {
    console.log(`Server.container=${this.container}`);
    return { hello: 'world' };
  },
}];
