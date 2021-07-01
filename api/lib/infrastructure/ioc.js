import { ItemCipherAesCdc256 } from "./ciphers/ItemCipherAesCdc256";

const { AccountRepositorySql } = require('./repositories/AccountRepositorySql');
const { ItemRepositorySql } = require('./repositories/ItemRepositorySql');
const { VaultRepositorySql } = require('./repositories/VaultRepositorySql');
const { VaultSummaryRepositorySql } = require('./repositories/VaultSummaryRepositorySql');
const { BcryptEncryption } = require('./security/BcryptEncryption');
const { Aes256GcmEncryption } = require('./security/Aes256GcmEncryption');
const { OAuth2ServerAuthenticatorModel } = require('./security/oauth/authenticator/OAuth2ServerAuthenticatorModel');
const { Oauth2ServerAuthenticator } = require('./security/oauth/authenticator/Oauth2ServerAuthenticator');
const environment = require('../../config/environment');

class IocContainer {

  #serviceMap;

  constructor() {
    this.#serviceMap = {};
  }

  register(serviceName, service) {
    this.#serviceMap[serviceName] = service;
    return service;
  }

  get(serviceName) {
    const service = this.#serviceMap[serviceName];
    if (!service) {
      throw new Error(`Service ${serviceName} not found in IOC container`);
    }
    return service;
  }

}

function build() {
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

const container = build();

module.exports = {
  IocContainer,
  container,
};
