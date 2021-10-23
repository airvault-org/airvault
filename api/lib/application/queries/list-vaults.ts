import { IocContainer } from '../../infrastructure/ioc';

export default (params: { ownerId: string }, iocContainer: IocContainer) => {

  const vaultSummaryRepository = iocContainer.get('vaultSummaryRepository');

  return vaultSummaryRepository.listAllUserVaultSummaries(params.ownerId);
}
