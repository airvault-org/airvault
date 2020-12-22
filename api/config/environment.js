require('dotenv').config();

/*
 * process.env.* MUST NOT be called but in this configuration file.
 */
function buildEnv() {

  const env = {

    name: 'development',

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
    env.name = 'test';
    env.server.port = null;
    env.server.logger = false;
    env.db.url = process.env.DB_TEST_URL;
  }

  if (process.env.NODE_ENV === 'production') {
    env.name = 'production';
  }

  return env;
}

module.exports = buildEnv();
