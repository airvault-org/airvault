module.exports = (iocContainer) => {

  const vaultRepository = iocContainer.get('VaultRepository');

  return vaultRepository.listAllUserVaultSummaries();
}
