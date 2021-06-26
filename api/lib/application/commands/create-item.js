const uuidv4 = require('uuid').v4;
const { Item, ItemContent } = require('../../domain/Item');
const { ItemType } = require('../../domain/Item');

module.exports = ({ vaultUuid, title, username, password, website } = {}, iocContainer) => {

  const itemRepository = iocContainer.get('itemRepository');

  const now = new Date();

  const itemContent = new ItemContent(title, username, password, website,);

  const item = new Item({
    uuid: uuidv4(),
    type: ItemType.LOGIN,
    content: itemContent,
    createdAt: now,
    updatedAt: now,
    vaultUuid
  });

  return itemRepository.save(item);
}
