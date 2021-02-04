module.exports = ({ uuid }, iocContainer) => {

  const vaultRepository = iocContainer.get('vaultRepository');

  return vaultRepository.deleteByUuid(uuid);
}
