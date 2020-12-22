const Account = require('../../domain/Account');

module.exports = ({ username, password, url } = {}, iocContainer) => {

  const accountRepository = iocContainer.get('AccountRepository');

  const now = new Date();

  const account = new Account({ username, password, email, createdAt: now, updatedAt: now });

  return accountRepository.save(account);
}
