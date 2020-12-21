const fastify = require('fastify');

const server = fastify({
  logger: true
})

server.get('/', async (request, reply) => {
  return { hello: 'world' }
})

module.exports = server;
