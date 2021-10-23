import { v4 as uuidv4 } from 'uuid';
import { Vault } from '../../domain/Vault';
import { IocContainer } from '../../infrastructure/ioc';

export default async (params: { accountId: string, name: string }, iocContainer: IocContainer) => {

  const accountRepository = iocContainer.get('accountRepository');
  const account = await accountRepository.findById(params.accountId);

  const vaultRepository = iocContainer.get('vaultRepository');

  const now = new Date();

  const vault = new Vault({
    uuid: uuidv4(),
    name: params.name,
    createdAt: now,
    updatedAt: now,
    accountUuid: account.uuid,
  });

  return await vaultRepository.save(vault);
}
