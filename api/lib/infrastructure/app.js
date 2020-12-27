function build(opts = {}) {

  // See https://nodejs.org/api/net.html#net_server_listen_options_callback
  const fastify = require('fastify')(opts);

  // https://github.com/fastify/fastify-helmet
  fastify.register(require('fastify-helmet'));

  // https://github.com/fastify/fastify-formbody
  fastify.register(require('fastify-formbody'));

  fastify.register(require('./security/oauth'), { prefix: '/oauth' });

  fastify.decorate('container', opts.container);

  fastify.after(() => {

    fastify.register(require('./routes/oauth'));

    fastify.register((instance, opts, done) => {

      instance.addHook('preValidation', fastify.auth([fastify.authenticate]));

      fastify.register(require('./routes/v1/root'));
      fastify.register(require('./routes/v1/vaults'));
      fastify.register(require('./routes/v1/accounts'));
      fastify.register(require('./routes/v1/items'));

      done();
    }, { prefix: '/v1' });

  });

  return fastify;
}

module.exports = build;
