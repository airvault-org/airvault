module.exports = async ({ uuid, title, username, password, website, vault_id } = {}, iocContainer) => {

  const itemRepository = iocContainer.get('itemRepository');

  const transientItem = await itemRepository.findByUuid(uuid);

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
  if (vault_id) {
    transientItem.vaultUuid = vault_id;
  }
  transientItem.updatedAt = new Date();

  return itemRepository.save(transientItem);
}
