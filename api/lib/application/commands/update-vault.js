module.exports = async ({ uuid, name } = {}, iocContainer) => {

  const vaultRepository = iocContainer.get('vaultRepository');

  const transientVault = await vaultRepository.findByUuid(uuid);

  if (name) {
    transientVault.name = name;
  }
  transientVault.updatedAt = new Date();

  return vaultRepository.save(transientVault);
}
