class IocContainer {

  private readonly serviceMap: Map<string, any>;

  constructor() {
    this.serviceMap = new Map();
  }

  register(serviceName: string, service: any) {
    this.serviceMap.set(serviceName, service);
    return service;
  }

  get(serviceName: string) {
    const service = this.serviceMap.get(serviceName);
    if (!service) {
      throw new Error(`Service ${serviceName} not found in IOC container`);
    }
    return service;
  }

}

export { IocContainer };
