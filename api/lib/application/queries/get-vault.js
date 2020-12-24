module.exports = ({ id }, iocContainer) => {

  const vaultRepository = iocContainer.get('VaultRepository');

  return vaultRepository.findById(id);
}
