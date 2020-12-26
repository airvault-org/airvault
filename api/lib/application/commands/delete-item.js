module.exports = ({ id }, iocContainer) => {

  const itemRepository = iocContainer.get('itemRepository');

  return itemRepository.delete(id);
}
