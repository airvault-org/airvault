import {ItemCipherAesCdc256} from './ciphers/ItemCipherAesCdc256';
import {IocContainer} from './ioc';
import {ItemRepositorySql} from './repositories/ItemRepositorySql';
import {VaultRepositorySql} from './repositories/VaultRepositorySql';
import {VaultSummaryRepositorySql} from './repositories/VaultSummaryRepositorySql';
import {AccountRepositorySql} from './repositories/AccountRepositorySql';
import {BcryptEncryption} from './security/BcryptEncryption';
import {Aes256GcmEncryption} from './security/Aes256GcmEncryption';
import {Oauth2ServerAuthenticator} from './security/oauth/authenticator/Oauth2ServerAuthenticator';
import { OAuth2ServerAuthenticatorModel } from './security/oauth/authenticator/OAuth2ServerAuthenticatorModel';

const environment = require('../../config/environment');

function buildIocContainer():IocContainer {
  const container = new IocContainer();

  const itemCipher = container.register('itemCipher', new ItemCipherAesCdc256(environment.items.cipher.key));

  const accountRepository = container.register('accountRepository', new AccountRepositorySql());
  container.register('itemRepository', new ItemRepositorySql(itemCipher));
  container.register('vaultRepository', new VaultRepositorySql());
  container.register('vaultSummaryRepository', new VaultSummaryRepositorySql());

  const encryption = container.register('encryption', new BcryptEncryption());
  container.register('httpEncryption', new Aes256GcmEncryption());

  // Authenticator
  const authenticatorModel = container.register('authenticatorModel', new OAuth2ServerAuthenticatorModel({
    accountRepository,
    encryption
  }));
  container.register('authenticator', new Oauth2ServerAuthenticator(authenticatorModel));

  return container;
}

const container:IocContainer = buildIocContainer();

const server = require('./app')({ logger: environment.server.logger, container });

module.exports = {

  server,

  async start() {
    try {
      await server.listen(environment.server.port, environment.server.host);

      // https://www.fastify.io/docs/latest/Server/#printroutes
      server.ready(() => {
        console.log(server.printRoutes());
      });

    } catch (err) {
      server.log.error(err);
      process.exit(1);
    }
  }

};
