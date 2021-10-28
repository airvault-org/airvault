import { environment } from '../../config/environment';
import Fastify, { FastifyInstance } from 'fastify';
import fastifyCors from 'fastify-cors';
import fastifyHelmet from 'fastify-helmet';
import fastifyFormbody from 'fastify-formbody';
import securityOAuth from './security/oauth';
import encryptionPreSerialization from './security/encryption-pre-serialization';
import routeAccounts from './routes/v1/accounts';
import routeItems from './routes/v1/items';
import routeRoot from './routes/v1/root';
import routeVaults from './routes/v1/vaults';

function build(opts: { logger?: Object, container?: Object } = {}): FastifyInstance {

  // See https://nodejs.org/api/net.html#net_server_listen_options_callback
  const fastify: FastifyInstance = Fastify(opts)

  fastify.decorate('container', opts.container);

  // https://github.com/fastify/fastify-cors
  fastify.register(fastifyCors, {origin: '*'});

  // https://github.com/fastify/fastify-helmet
  fastify.register(fastifyHelmet);

  // https://github.com/fastify/fastify-formbody
  fastify.register(fastifyFormbody);

  fastify.register(securityOAuth, {prefix: '/oauth'});

  if (environment.http.encryption.enabled) {
    fastify.register(encryptionPreSerialization);
  }

  fastify.after(() => {

    fastify.register(async () => {

      fastify.register(routeAccounts);
      fastify.register(routeItems);
      fastify.register(routeRoot);
      fastify.register(routeVaults);
    }, {prefix: '/v1'});

  });

  return fastify;
}

export = build;
