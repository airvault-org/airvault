module.exports = (iocContainer) => {

  const itemRepository = iocContainer.get('ItemRepository');

  return itemRepository.findAll();
}
