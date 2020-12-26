module.exports = (iocContainer) => {

  const vaultRepository = iocContainer.get('vaultRepository');

  return vaultRepository.listAllUserVaultSummaries();
}
