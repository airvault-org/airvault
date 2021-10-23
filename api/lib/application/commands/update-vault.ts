import { IocContainer } from '../../infrastructure/ioc';

export default async (params: { uuid: string, name: string }, iocContainer: IocContainer) => {

  const vaultRepository = iocContainer.get('vaultRepository');

  const transientVault = await vaultRepository.findByUuid(params.uuid);

  if (params.name) {
    transientVault.name = params.name;
  }
  transientVault.updatedAt = new Date();

  return vaultRepository.save(transientVault);
}
