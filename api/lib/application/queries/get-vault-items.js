module.exports = ({ vaultId }, iocContainer) => {

  const itemRepository = iocContainer.get('itemRepository');

  return itemRepository.findAllByVaultId(vaultId);
}
