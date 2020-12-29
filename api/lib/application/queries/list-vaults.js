module.exports = ({ ownerId }, iocContainer) => {

  const vaultRepository = iocContainer.get('vaultRepository');

  return vaultRepository.listAllUserVaultSummaries(ownerId);
}
