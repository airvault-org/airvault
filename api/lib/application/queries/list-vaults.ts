import { IocContainer } from '../../infrastructure/ioc';
import { VaultSummaryRepository } from '../../domain/VaultSummaryRepository';
import { EntityList } from '../../domain/EntityList';
import { VaultSummary } from '../../domain/VaultSummary';

export default (params: { ownerId: number }, iocContainer: IocContainer): Promise<EntityList<VaultSummary>> => {

  const vaultSummaryRepository: VaultSummaryRepository = iocContainer.get('vaultSummaryRepository');

  return vaultSummaryRepository.listAllUserVaultSummaries(params.ownerId);
}
