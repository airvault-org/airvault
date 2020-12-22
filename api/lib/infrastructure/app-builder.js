const fastify = require('fastify');
const helmet = require('fastify-helmet')

const IocContainer = require('./ioc-container');
const PassRepositorySql = require('./repositories/PassRepositorySql');

function build(opts = {}) {

  // See https://nodejs.org/api/net.html#net_server_listen_options_callback
  const app = fastify(opts);

  app.register(helmet);

  const container = new IocContainer();
  container.register('PassRepository', new PassRepositorySql());
  app.decorate('container', container);

  require('./routes/root').forEach(route => {
    app.route(route);
  });
  require('./routes/passes').forEach(route => {
    app.route(route);
  });

  return app;
}

module.exports = build;
