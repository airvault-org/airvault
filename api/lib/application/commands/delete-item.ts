import { IocContainer } from '../../infrastructure/ioc';

export default (params: { uuid: string }, iocContainer: IocContainer) => {

  const itemRepository = iocContainer.get('itemRepository');

  return itemRepository.deleteByUuid(params.uuid);
}
