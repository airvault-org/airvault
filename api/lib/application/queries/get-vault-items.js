module.exports = ({ vaultId }, iocContainer) => {

  const itemRepository = iocContainer.get('ItemRepository');

  return itemRepository.findAllByVaultId(vaultId);
}
