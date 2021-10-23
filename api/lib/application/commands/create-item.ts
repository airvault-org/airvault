import { v4 as uuidv4 } from 'uuid';
import { Item, ItemContent, ItemType } from '../../domain/Item';
import { IocContainer } from '../../infrastructure/ioc';

export default (params: { vaultUuid: string, title: string, username: string, password: string, website: string }, iocContainer: IocContainer) => {

  const itemRepository = iocContainer.get('itemRepository');

  const now = new Date();

  const itemContent = new ItemContent(params.title, params.username, params.password, params.website,);

  const item = new Item({
    uuid: uuidv4(),
    type: ItemType.LOGIN,
    content: itemContent,
    createdAt: now,
    updatedAt: now,
    vaultUuid: params.vaultUuid,
  });

  return itemRepository.save(item);
}
