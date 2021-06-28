// Interface is inspired by Spring Data JPA
// See https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#repositories.core-concepts
import {Item} from './Item';
import {ItemList} from './ItemList';

interface ItemRepository {

  save(item: Item): Promise<Item>;

  find({accountId}?:any): Promise<ItemList>;

  findById(id: number): Promise<Item|undefined>;

  findByUuid(uuid: string): Promise<Item|undefined>;

  findAllByVaultUuid(vaultUuid: string): Promise<ItemList>;

  delete(id: number): Promise<void>;

  deleteByUuid(uuid: string): Promise<void>;

  existsById(id: number): Promise<boolean>;

  existsByUuid(uuid: string): Promise<boolean>;
}

export {ItemRepository};
