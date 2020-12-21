const fastify = require('fastify');

function build(opts={}) {

  // See https://nodejs.org/api/net.html#net_server_listen_options_callback
  const app = fastify(opts);

  app.get('/', async (request, reply) => {
    return { hello: 'world' };
  });

  return app;
}

module.exports = build;
