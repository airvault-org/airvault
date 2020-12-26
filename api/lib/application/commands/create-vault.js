const Vault = require('../../domain/Vault');

module.exports = ({ name } = {}, iocContainer) => {

  const vaultRepository = iocContainer.get('vaultRepository');

  const now = new Date();

  const vault = new Vault({ name, createdAt: now, updatedAt: now, accountId: 1 });

  return vaultRepository.save(vault);
}
