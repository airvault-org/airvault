module.exports = ({ id, accountId }, iocContainer) => {

  const vaultRepository = iocContainer.get('vaultRepository');

  return vaultRepository.getByIdAndAccountId(id, accountId);
}
