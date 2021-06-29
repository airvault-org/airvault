module.exports = ({ vaultUuid, accountId }, iocContainer) => {

  const vaultRepository = iocContainer.get('vaultRepository');

  return vaultRepository.getByUuidAndAccountId(vaultUuid, accountId);
}
