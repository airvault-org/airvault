import { IocContainer } from '../../infrastructure/ioc';

export default async (params: { uuid: string, title: string, username: string, password: string, website: string, vault_id: string }, iocContainer: IocContainer) => {

  const itemRepository = iocContainer.get('itemRepository');

  const transientItem = await itemRepository.findByUuid(params.uuid);

  if (params.title) {
    transientItem.title = params.title;
  }
  if (params.username) {
    transientItem.username = params.username;
  }
  if (params.password) {
    transientItem.password = params.password;
  }
  if (params.website) {
    transientItem.website = params.website;
  }
  if (params.vault_id) {
    transientItem.vaultUuid = params.vault_id;
  }
  transientItem.updatedAt = new Date();

  return itemRepository.save(transientItem);
}
