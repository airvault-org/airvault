module.exports = async ({ id, username, password, website } = {}, iocContainer) => {

  const itemRepository = iocContainer.get('ItemRepository');

  const transientItem = await itemRepository.findById(id);

  if (username) {
    transientItem.username = username;
  }
  if (password) {
    transientItem.password = password;
  }
  if (website) {
    transientItem.website = website;
  }
  transientItem.updatedAt = new Date();

  return itemRepository.save(transientItem);
}
