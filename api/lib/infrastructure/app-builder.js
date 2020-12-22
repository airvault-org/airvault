const fastify = require('fastify');
const helmet = require('fastify-helmet');
const jwt = require('fastify-jwt');

const IocContainer = require('./ioc-container');
const AccountRepositorySql = require('./repositories/AccountRepositorySql');
const PassRepositorySql = require('./repositories/PassRepositorySql');

function build(opts = {}) {

  // See https://nodejs.org/api/net.html#net_server_listen_options_callback
  const app = fastify(opts);

  app.register(helmet);

  app.register(jwt, { secret: 'supersecret' })

  const container = new IocContainer();
  container.register('AccountRepository', new AccountRepositorySql());
  container.register('PassRepository', new PassRepositorySql());
  app.decorate('container', container);

  require('./routes/root').forEach(route => {app.route(route);});
  require('./routes/accounts').forEach(route => {app.route(route);});
  require('./routes/passes').forEach(route => {app.route(route);});

  return app;
}

module.exports = build;
