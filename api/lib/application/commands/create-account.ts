import { v4 as uuidv4 } from 'uuid';
import { AccountWithEncryptedPassword } from '../../domain/AccountWithEncryptedPassword';
import { Vault } from '../../domain/Vault';
import { ApplicationError } from '../errors';
import { IocContainer } from '../../infrastructure/ioc';
import { AccountRepository } from '../../domain/AccountRepository';
import { VaultRepository } from '../../domain/VaultRepository';
import { Encryption } from '../../infrastructure/security/Encryption';
import { Account } from '../../domain/Account';

export default async (params: { name: string, username: string, password: string, email: string }, iocContainer: IocContainer) => {

  const accountRepository: AccountRepository = iocContainer.get('accountRepository');
  const vaultRepository: VaultRepository = iocContainer.get('vaultRepository');
  const encryption: Encryption = iocContainer.get('encryption');

  const isUsernameAvailable = await accountRepository.isUsernameAvailable(params.username);
  if (!isUsernameAvailable) {
    throw new ApplicationError('`username` is not available');
  }

  const isEmailAvailable = await accountRepository.isEmailAvailable(params.email);
  if (!isEmailAvailable) {
    throw new ApplicationError('`email` is not available');
  }

  const now = new Date();

  const encryptedPassword = await encryption.encrypt(params.password);

  const accountUuid: string = uuidv4();

  const account: Account = await accountRepository.save(new AccountWithEncryptedPassword({
    uuid: accountUuid,
    name: params.name,
    username: params.username,
    encryptedPassword,
    email: params.email,
    createdAt: now,
    updatedAt: now,
  }));

  await vaultRepository.save(new Vault({
    uuid: uuidv4(),
    name: 'Private',
    accountUuid,
    createdAt: now,
    updatedAt: now,
  }));

  return account;
}
