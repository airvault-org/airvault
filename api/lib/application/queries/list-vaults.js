module.exports = ({ ownerId }, iocContainer) => {

  const vaultSummaryRepository = iocContainer.get('vaultSummaryRepository');

  return vaultSummaryRepository.listAllUserVaultSummaries(ownerId);
}
