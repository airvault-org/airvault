module.exports = async ({ id, name } = {}, iocContainer) => {

  const vaultRepository = iocContainer.get('vaultRepository');

  const transientVault = await vaultRepository.findById(id);

  if (name) {
    transientVault.name = name;
  }
  transientVault.updatedAt = new Date();

  return vaultRepository.save(transientVault);
}
