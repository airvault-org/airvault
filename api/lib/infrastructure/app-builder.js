const fastify = require('fastify');
const helmet = require('fastify-helmet');

const IocContainer = require('./ioc-container');
const AccountRepositorySql = require('./repositories/AccountRepositorySql');
const ItemRepositorySql = require('./repositories/ItemRepositorySql');

function build(opts = {}) {

  // See https://nodejs.org/api/net.html#net_server_listen_options_callback
  const app = fastify(opts);

  // https://github.com/fastify/fastify-helmet
  app.register(helmet);

  const container = new IocContainer();
  container.register('AccountRepository', new AccountRepositorySql());
  container.register('ItemRepository', new ItemRepositorySql());
  app.decorate('container', container);

  app.register(function(instance, opts, done) {
    require('./routes/v1/root').forEach(route => {
      instance.route(route);
    });
    require('./routes/v1/accounts').forEach(route => {
      instance.route(route);
    });
    require('./routes/v1/items').forEach(route => {
      instance.route(route);
    });
    done();
  }, { prefix: '/api/v1' });

  return app;
}

module.exports = build;
