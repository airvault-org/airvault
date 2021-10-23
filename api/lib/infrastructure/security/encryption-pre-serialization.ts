import fp from 'fastify-plugin';
import { DoneFuncWithErrOrRes, FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export default fp(async function (fastify: FastifyInstance) {

  const iocContainer = fastify.container;

  fastify.addHook('preValidation', async (request: FastifyRequest<any>) => {
    if (request.context.config.authentication === false) {
      return;
    }

    if (!request.body) {
      return;
    }

    const key = request.headers['authorization'].replace('Bearer ', '').substring(0, 6);
    const encryption = iocContainer.get('httpEncryption');
    const decrypted = await encryption.decrypt(request.body.data, key);
    //const decrypted = request.body.data;

    request.body = decrypted;
  });

  fastify.addHook('preSerialization', async (request: FastifyRequest<any>, reply: FastifyReply, payload) => {
    if (request.context.config.authentication === false) {
      return payload;
    }

    const key = request.headers['authorization'].replace('Bearer ', '').substring(0, 6);
    const encryption = iocContainer.get('httpEncryption');
    const encrypted = await encryption.encrypt(payload, key);
    //const encrypted = payload;

    return {data: encrypted};
  });

  fastify.addHook('onSend', (request: FastifyRequest<any>, reply: FastifyReply, payload, done: DoneFuncWithErrOrRes) => {
    const err = null;
    done(err, payload)
  });
}, '3.x');
