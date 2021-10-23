import { v4 as uuidv4 } from 'uuid';
import { AccountWithEncryptedPassword } from '../../domain/AccountWithEncryptedPassword';
import { Vault } from '../../domain/Vault';
import { ApplicationError } from '../errors';
import { IocContainer } from '../../infrastructure/ioc';

export default async (params: { name: string, username: string, password: string, email: string }, iocContainer: IocContainer) => {

  const accountRepository = iocContainer.get('accountRepository');
  const vaultRepository = iocContainer.get('vaultRepository');
  const encryption = iocContainer.get('encryption');

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

  const account = await accountRepository.save(new AccountWithEncryptedPassword({
    uuid: uuidv4(),
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
    accountUuid: account.uuid,
    createdAt: now,
    updatedAt: now,
  }));

  return account;
}
