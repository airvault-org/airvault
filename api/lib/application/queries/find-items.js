module.exports = (iocContainer) => {

  const itemRepository = iocContainer.get('itemRepository');

  return itemRepository.findAll();
}
