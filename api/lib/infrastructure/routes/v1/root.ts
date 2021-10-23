import { FastifyInstance } from 'fastify';

export default async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'GET',
    url: '/',
    config: {
      authentication: false
    },
    handler: async () => {
      return {hello: 'world'};
    },
  });
};
