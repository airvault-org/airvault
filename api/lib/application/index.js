module.exports = {
  createAccount: require('./commands/create-account'),
  createVault: require('./commands/create-vault'),
  createItem: require('./commands/create-item'),
  deleteItem: require('./commands/delete-item'),
  deleteVault: require('./commands/delete-vault'),
  findItems: require('./queries/find-items'),
  getVault: require('./queries/get-vault'),
  getVaultItems: require('./queries/get-vault-items'),
  listVaults: require('./queries/list-vaults'),
  updateItem: require('./commands/update-item'),
  updateVault: require('./commands/update-vault'),
};
