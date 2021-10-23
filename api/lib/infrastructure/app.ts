import Fastify, { FastifyInstance } from 'fastify';

const environment = require('../../config/environment');

function build(opts: { logger?: Object, container?: Object } = {}): FastifyInstance {

  // See https://nodejs.org/api/net.html#net_server_listen_options_callback
  const fastify: FastifyInstance = Fastify(opts)

  fastify.decorate('container', opts.container);

  // https://github.com/fastify/fastify-cors
  fastify.register(require('fastify-cors'), {origin: '*'});

  // https://github.com/fastify/fastify-helmet
  fastify.register(require('fastify-helmet'));

  // https://github.com/fastify/fastify-formbody
  fastify.register(require('fastify-formbody'));

  fastify.register(require('./security/oauth'), {prefix: '/oauth'});

  if (environment.http.encryption.enabled) {
    fastify.register(require('./security/encryption-pre-serialization'));
  }

  fastify.after(() => {

    fastify.register((instance, opts, done) => {

      fastify.register(require('./routes/v1/root'));
      fastify.register(require('./routes/v1/vaults'));
      fastify.register(require('./routes/v1/accounts'));
      fastify.register(require('./routes/v1/items'));

      done();
    }, {prefix: '/v1'});

  });

  return fastify;
}

module.exports = build;
