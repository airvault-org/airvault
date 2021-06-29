import {EntityRepository} from './EntityRepository';
import {Vault} from './Vault';

interface VaultRepository extends EntityRepository<Vault> {

  getByUuidAndAccountId(uuid: string, accountId: number): Promise<Vault|null>;

  existsByUuidAndAccountId(uuid: string, accountId: number): Promise<boolean>;

}

export {VaultRepository};
