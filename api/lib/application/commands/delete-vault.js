module.exports = ({ id }, iocContainer) => {

  const vaultRepository = iocContainer.get('VaultRepository');

  return vaultRepository.delete(id);
}
