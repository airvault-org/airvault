import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { ApplicationError } from '../../../application/errors';
import createAccount from '../../../application/commands/create-account';

export default async (fastify: FastifyInstance) => {

  fastify.route({
    method: 'POST',
    url: '/accounts',
    config: {
      authentication: false
    },
    handler: async function (request: FastifyRequest<any>, reply: FastifyReply) {
      const params = request.body;
      try {
        const account = await createAccount(params, this.container);
        reply.code(201).send(account);
      } catch (err) {
        if (err instanceof ApplicationError) {
          reply.code(400).send({
            'statusCode': 400,
            'code': '400',
            'error': 'Bad request',
            'message': `Application error: ${err.message}`
          });
        } else {
          reply.code(500).send({
            'statusCode': 500,
            'code': '500',
            'error': 'Internal server error',
            'message': `Server error: ${err.message}`
          })
        }
      }
    },
  });
};

