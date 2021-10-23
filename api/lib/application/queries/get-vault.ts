import { IocContainer } from '../../infrastructure/ioc';
import { Vault } from '../../domain/Vault';
import { VaultRepository } from '../../domain/VaultRepository';

export default (params: { vaultUuid: string, accountId: number }, iocContainer: IocContainer): Promise<Vault | null> => {

  const vaultRepository: VaultRepository = iocContainer.get('vaultRepository');

  return vaultRepository.getByUuidAndAccountId(params.vaultUuid, params.accountId);
}
