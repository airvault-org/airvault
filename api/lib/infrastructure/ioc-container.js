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

module.exports = IocContainer;
