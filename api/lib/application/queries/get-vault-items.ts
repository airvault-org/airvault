import { IocContainer } from '../../infrastructure/ioc';
import { Item } from '../../domain/Item';
import { EntityList } from '../../domain/EntityList';
import { ItemRepository } from '../../domain/ItemRepository';

export default (params: { vaultUuid: string }, iocContainer: IocContainer): Promise<EntityList<Item>> => {

  const itemRepository: ItemRepository = iocContainer.get('itemRepository');

  return itemRepository.findAllByVaultUuid(params.vaultUuid);
}
