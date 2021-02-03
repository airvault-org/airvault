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
      host: process.env.HOST || 'localhost',
      logger: true
    },

    db: {
      url: process.env.DB_URL
    },

    oauth: {
      enabled: true,
      jwtSecret: process.env.JWT_SECRET || ''
    },

    items: {
      cypher: {
        key: process.env.ITEMS_CYPHER_KEY
      }
    }
  };

  if (process.env.NODE_ENV === 'test') {
    env.name = 'test';
    env.server.port = null;
    env.server.logger = false;
    env.db.url = process.env.DB_TEST_URL;
    env.oauth.enabled = false;
  }

  if (process.env.NODE_ENV === 'production') {
    env.name = 'production';
  }

  return env;
}

module.exports = buildEnv();
