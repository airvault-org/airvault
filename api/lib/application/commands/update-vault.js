module.exports = async ({ id, name } = {}, iocContainer) => {

  const vaultRepository = iocContainer.get('VaultRepository');

  const transientVault = await vaultRepository.findById(id);

  if (name) {
    transientVault.name = name;
  }
  transientVault.updatedAt = new Date();

  return vaultRepository.save(transientVault);
}
