import { IocContainer } from '../../infrastructure/ioc';

export default (params: { uuid: string }, iocContainer: IocContainer) => {

  const vaultRepository = iocContainer.get('vaultRepository');

  return vaultRepository.deleteByUuid(params.uuid);
}
