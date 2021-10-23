import { IocContainer } from '../../infrastructure/ioc';
import { Vault } from '../../domain/Vault';

export default (params: { vaultUuid: string, accountId: string }, iocContainer: IocContainer): Vault => {

  const vaultRepository = iocContainer.get('vaultRepository');

  return vaultRepository.getByUuidAndAccountId(params.vaultUuid, params.accountId);
}
