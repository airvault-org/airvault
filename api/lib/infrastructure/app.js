const fastify = require('fastify');

function build(opts={}) {

  // See https://nodejs.org/api/net.html#net_server_listen_options_callback
  const app = fastify(opts);

  const rootRoutes = require('./routes/root');

  rootRoutes.forEach(route => {
    app.route(route);
  });

  return app;
}

module.exports = build;
