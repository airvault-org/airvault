const uuidv4 = require('uuid').v4;
const Item = require('../../domain/Item');
const ItemType = require('../../domain/ItemType');

module.exports = ({ vaultUuid, title, username, password, website } = {}, iocContainer) => {

  const itemRepository = iocContainer.get('itemRepository');

  const now = new Date();

  const item = new Item({ uuid: uuidv4(), type: ItemType.LOGIN, title, username, password, website, createdAt: now, updatedAt: now, vaultUuid });

  return itemRepository.save(item);
}
