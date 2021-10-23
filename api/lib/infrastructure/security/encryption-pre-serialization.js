const fp = require('fastify-plugin');

module.exports = fp(function(fastify, opts, done) {

  const iocContainer = fastify.container;

  fastify.addHook('preValidation', async (request, reply) => {
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
  })

  fastify.addHook('preSerialization', async (request, reply, payload) => {
    if (request.context.config.authentication === false) {
      return payload;
    }

    const key = request.headers['authorization'].replace('Bearer ', '').substring(0, 6);
    const encryption = iocContainer.get('httpEncryption');
    const encrypted = await encryption.encrypt(payload, key);
    //const encrypted = payload;

    return { data: encrypted };
  })

  fastify.addHook('onSend', (request, reply, payload, done) => {
    const err = null;
    done(err, payload)
  })

  done();
}, '3.x');
