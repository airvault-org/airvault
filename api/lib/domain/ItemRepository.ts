import {Item} from './Item';
import {EntityRepository} from './EntityRepository';
import {EntityList} from './EntityList';

interface ItemRepository extends EntityRepository<Item>{

  findAllByVaultUuid(vaultUuid: string): Promise<EntityList<Item>>;

}

export {ItemRepository};
