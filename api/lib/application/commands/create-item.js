const Item = require('../../domain/Item');

module.exports = ({ username, password, website } = {}, iocContainer) => {

  const itemRepository = iocContainer.get('ItemRepository');

  const now = new Date();

  const item = new Item({ username, password, website, createdAt: now, updatedAt: now });

  return itemRepository.save(item);
}
