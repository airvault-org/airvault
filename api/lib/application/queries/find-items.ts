import { IocContainer } from '../../infrastructure/ioc';
import { EntityList } from '../../domain/EntityList';
import { Item } from '../../domain/Item';

export default (params: { accountId: string }, iocContainer: IocContainer): EntityList<Item> => {

  const itemRepository = iocContainer.get('itemRepository');

  return itemRepository.find({accountId: params.accountId});
}
