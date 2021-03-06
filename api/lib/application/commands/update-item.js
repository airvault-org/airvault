module.exports = async ({ uuid, username, password, website } = {}, iocContainer) => {

  const itemRepository = iocContainer.get('itemRepository');

  const transientItem = await itemRepository.findByUud(uuid);

  if (title) {
    transientItem.title = title;
  }
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
