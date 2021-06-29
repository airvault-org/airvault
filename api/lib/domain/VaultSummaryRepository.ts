import {VaultSummary} from './VaultSummary';
import {EntityRepository} from './EntityRepository';
import {EntityList} from './EntityList';

interface VaultSummaryRepository extends EntityRepository<VaultSummary>{

  listAllUserVaultSummaries(accountId: number): Promise<EntityList<VaultSummary>>;

}

export {VaultSummaryRepository};
