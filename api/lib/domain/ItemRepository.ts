// Interface is inspired by Spring Data JPA
// See https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#repositories.core-concepts
import {Item} from './Item';
import {ItemList} from './ItemList';
import {EntityRepository} from './EntityRepository';

interface ItemRepository extends EntityRepository<Item, ItemList>{

  findAllByVaultUuid(vaultUuid: string): Promise<ItemList>;

}

export {ItemRepository};
