import { IocContainer } from '../../infrastructure/ioc';
import { Item } from '../../domain/Item';
import { EntityList } from '../../domain/EntityList';

export default (params: { vaultUuid: string }, iocContainer: IocContainer): EntityList<Item> => {

  const itemRepository = iocContainer.get('itemRepository');

  return itemRepository.findAllByVaultUuid(params.vaultUuid);
}
