import {FastifyPluginAsync, FastifyReply, FastifyRequest} from 'fastify';
import fp from 'fastify-plugin';
import fa from 'fastify-auth';
import {User} from 'oauth2-server';

declare module 'fastify' {
  interface FastifyInstance {
    container: any;
    authenticate(request: FastifyRequest, reply: FastifyReply): void;
  }

  interface FastifyRequest {
    user: User;
    context: any;
  }
}

const myPluginAsync: FastifyPluginAsync = async (fastify, options) => {

  const authenticator = fastify.container.get('authenticator');

  // https://github.com/fastify/fastify-auth
  await fastify.register(fa);

  await fastify.after()

  fastify.addHook('onRequest', async (request, reply) => {
    request.user = {};
  });

  fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    if (request.context.config.authentication === false) {
      return;
    }
    await authenticator.authenticate(request, reply);
  });

  fastify.addHook('preValidation', fastify.auth([fastify.authenticate]));

  fastify.route({
    method: 'POST',
    url: '/token',
    config: {
      authentication: false
    },
    handler: function (request, reply) {
      try {
        authenticator.token(request, reply);
      } catch (error) {
        this.log.error(error);
        throw error;
      }
    },
  });

}

export default fp(myPluginAsync, '3.x')
