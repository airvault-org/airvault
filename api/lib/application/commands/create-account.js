const AccountWithEncryptedPassword = require('../../domain/AccountWithEncryptedPassword');
const Vault = require('../../domain/Vault');
const { ApplicationError } = require('../errors');

module.exports = async ({ username, password, email } = {}, iocContainer) => {

  const accountRepository = iocContainer.get('accountRepository');
  const vaultRepository = iocContainer.get('vaultRepository');
  const encryption = iocContainer.get('encryption');

  const isUsernameAvailable = await accountRepository.isUsernameAvailable(username);
  if (!isUsernameAvailable) {
    throw new ApplicationError('`username` is not available');
  }

  const isEmailAvailable = await accountRepository.isEmailAvailable(email);
  if (!isEmailAvailable) {
    throw new ApplicationError('`email` is not available');
  }

  const now = new Date();

  const encryptedPassword = await encryption.encrypt(password);

  const account = await accountRepository.save(new AccountWithEncryptedPassword({
    username,
    encryptedPassword,
    email,
    createdAt: now,
    updatedAt: now,
  }));

  await vaultRepository.save(new Vault({
    name: 'Private',
    accountId: account.id,
  }));

  return account;
}
