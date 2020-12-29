const Vault = require('../../domain/Vault');

module.exports = async ({ accountId, name } = {}, iocContainer) => {

  const vaultRepository = iocContainer.get('vaultRepository');

  const now = new Date();

  const vault = new Vault({ name, createdAt: now, updatedAt: now, accountId });

  return await vaultRepository.save(vault);
}
