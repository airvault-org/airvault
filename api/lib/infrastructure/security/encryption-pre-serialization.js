const fp = require('fastify-plugin');
const iocContainer = require('../ioc').container;

module.exports = fp(function(fastify, opts, done) {

  fastify.addHook('preSerialization', async (request, reply, payload) => {
    if (request.context.config.authentication === false) {
      return payload;
    }

    const key = request.headers['authorization'].replace('Bearer ', '');
    const encryption = iocContainer.get('httpEncryption');
    const encrypted = await encryption.encrypt(payload, key);

    return encrypted;
  })

  done();
}, '3.x');
