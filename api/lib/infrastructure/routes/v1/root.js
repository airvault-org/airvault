module.exports = [{
  method: 'GET',
  url: '/',
  handler: async function(request, reply) {
    return { hello: 'world' };
  },
}, {
  method: 'GET',
  url: '/oauth/token',
  handler: async function(request, reply) {
    const token = this.jwt.sign({ name: 'foo' });
    reply.send({ token });
  }
}];
