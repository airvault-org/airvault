module.exports = ({ vaultUuid }, iocContainer) => {

  const itemRepository = iocContainer.get('itemRepository');

  return itemRepository.findAllByVaultUuid(vaultUuid);
}
