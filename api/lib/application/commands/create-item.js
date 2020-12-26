const Item = require('../../domain/Item');

module.exports = ({ username, password, website } = {}, iocContainer) => {

  const itemRepository = iocContainer.get('itemRepository');

  const now = new Date();

  const item = new Item({ username, password, website, createdAt: now, updatedAt: now, vaultId: 1 });

  return itemRepository.save(item);
}
