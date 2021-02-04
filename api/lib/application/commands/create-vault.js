const uuidv4 = require('uuid').v4;
const Vault = require('../../domain/Vault');

module.exports = async ({ accountId, name } = {}, iocContainer) => {

  const accountRepository = iocContainer.get('accountRepository');
  const account = await accountRepository.findById(accountId);

  const vaultRepository = iocContainer.get('vaultRepository');

  const now = new Date();

  const vault = new Vault({ uuid: uuidv4(), name, createdAt: now, updatedAt: now, accountUuid: account.uuid });

  return await vaultRepository.save(vault);
}
