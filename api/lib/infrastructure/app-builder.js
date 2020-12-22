const fastify = require('fastify');
const helmet = require('fastify-helmet');
const jwt = require('fastify-jwt');

const IocContainer = require('./ioc-container');
const AccountRepositorySql = require('./repositories/AccountRepositorySql');
const ItemRepositorySql = require('./repositories/ItemRepositorySql');

function build(opts = {}) {

  // See https://nodejs.org/api/net.html#net_server_listen_options_callback
  const app = fastify(opts);

  app.register(helmet);

  const container = new IocContainer();
  container.register('AccountRepository', new AccountRepositorySql());
  container.register('ItemRepository', new ItemRepositorySql());
  app.decorate('container', container);

  require('./routes/root').forEach(route => {app.route(route);});
  require('./routes/accounts').forEach(route => {app.route(route);});
  require('./routes/items').forEach(route => {app.route(route);});

  return app;
}

module.exports = build;
