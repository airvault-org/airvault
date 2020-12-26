const AccountWithEncryptedPassword = require('../../domain/AccountWithEncryptedPassword');
const { ApplicationError } = require('../errors');

module.exports = async ({ username, password, email } = {}, iocContainer) => {

  const accountRepository = iocContainer.get('accountRepository');
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

  const account = new AccountWithEncryptedPassword({
    username,
    encryptedPassword,
    email,
    createdAt: now,
    updatedAt: now
  });

  return accountRepository.save(account);
}
