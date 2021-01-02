module.exports = ({ accountId, query }, iocContainer) => {

  const itemRepository = iocContainer.get('itemRepository');

  return itemRepository.find({ accountId, query });
}
