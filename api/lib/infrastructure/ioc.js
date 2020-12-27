const AccountRepositorySql = require('./repositories/AccountRepositorySql');
const ItemRepositorySql = require('./repositories/ItemRepositorySql');
const VaultRepositorySql = require('./repositories/VaultRepositorySql');
const BcryptEncryption = require('./security/BcryptEncryption');

class IocContainer {

  #serviceMap;

  constructor() {
    this.#serviceMap = {};
  }

  register(serviceName, service) {
    this.#serviceMap[serviceName] = service;
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
  container.register('accountRepository', new AccountRepositorySql());
  container.register('itemRepository', new ItemRepositorySql());
  container.register('vaultRepository', new VaultRepositorySql());
  container.register('encryption', new BcryptEncryption());
  return container;
}

const container = build();

module.exports = {
  IocContainer,
  container,
};
