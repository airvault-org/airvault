import * as dotenv from "dotenv";
dotenv.config();

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
      cipher: {
        key: process.env.ITEMS_CYPHER_KEY
      }
    },

    http: {
      encryption: {
        enabled: process.env.HTTP_ENCRYPTION_ENABLED ? (process.env.HTTP_ENCRYPTION_ENABLED === 'true') : true,
      }
    }
  };

  if (process.env.NODE_ENV === 'test') {
    env.name = 'test';
    env.server.port = 0;
    env.server.logger = false;
    env.db.url = process.env.DB_TEST_URL;
    env.oauth.enabled = false;
    env.items.cipher.key = 'items_cipher_key';
    env.http.encryption.enabled = false;
  }

  if (process.env.NODE_ENV === 'production') {
    env.name = 'production';
  }

  return env;
}

export default buildEnv();
