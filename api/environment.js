require('dotenv').config();

/*
 * process.env.* MUST NOT be called but in this configuration file.
 */
function buildEnv() {

  const env = {
    // See https://www.fastify.io/docs/latest/Server/
    server: {
      port: process.env.PORT || 3000,
      logger: true
    },

    db: {
      url: process.env.DB_URL
    }
  };

  if (process.env.NODE_ENV === 'test') {
    env.server.port = null;
    env.server.logger = false;
  }

  return env;
}

module.exports = buildEnv();
