module.exports = ({ id }, iocContainer) => {

  const itemRepository = iocContainer.get('ItemRepository');

  return itemRepository.delete(id);
}
