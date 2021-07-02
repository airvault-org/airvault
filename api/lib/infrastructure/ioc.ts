class IocContainer {

  private readonly serviceMap: Record<string, any>;

  constructor() {
    this.serviceMap = {};
  }

  register(serviceName: string, service: any) {
    this.serviceMap[serviceName] = service;
    return service;
  }

  get(serviceName: string) {
    const service = this.serviceMap[serviceName];
    if (!service) {
      throw new Error(`Service ${serviceName} not found in IOC container`);
    }
    return service;
  }

}

export { IocContainer};
