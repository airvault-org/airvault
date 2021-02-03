const Item = require('../../domain/Item');
const ItemType = require('../../domain/ItemType');

module.exports = ({ title, username, password, website } = {}, iocContainer) => {

  const itemRepository = iocContainer.get('itemRepository');

  const now = new Date();

  const item = new Item({ type: ItemType.LOGIN, title, username, password, website, createdAt: now, updatedAt: now, vaultId: 1 });

  return itemRepository.save(item);
}
