const AccountRepositorySql = require('./repositories/AccountRepositorySql');
const ItemRepositorySql = require('./repositories/ItemRepositorySql');
const VaultRepositorySql = require('./repositories/VaultRepositorySql');
const BcryptEncryption = require('./security/BcryptEncryption');
const OAuth2ServerAuthenticatorModel = require('./security/oauth/authenticator/OAuth2ServerAuthenticatorModel');
const Oauth2ServerAuthenticator = require('./security/oauth/authenticator/Oauth2ServerAuthenticator');

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

  const accountRepository = container.register('accountRepository', new AccountRepositorySql());
  container.register('itemRepository', new ItemRepositorySql());
  container.register('vaultRepository', new VaultRepositorySql());

  const encryption = container.register('encryption', new BcryptEncryption());

  // Authenticator
  const authenticatorModel = container.register('authenticatorModel', new OAuth2ServerAuthenticatorModel({ accountRepository, encryption }));
  container.register('authenticator', new Oauth2ServerAuthenticator(authenticatorModel));
  return container;
}

const container = build();

module.exports = {
  IocContainer,
  container,
};
