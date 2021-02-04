module.exports = ({ accountId }, iocContainer) => {

  const itemRepository = iocContainer.get('itemRepository');

  return itemRepository.find({ accountId });
}
