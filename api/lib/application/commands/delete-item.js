module.exports = ({ uuid }, iocContainer) => {

  const itemRepository = iocContainer.get('itemRepository');

  return itemRepository.deleteByUuid(uuid);
}
