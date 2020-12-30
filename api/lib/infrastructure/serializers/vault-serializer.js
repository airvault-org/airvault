const { InfrastructureError } = require('../errors');
const Vault = require('../../domain/Vault');
const VaultSummary = require('../../domain/VaultSummary');

function serializeVault(vault) {
  return {
    'object': 'vault',
    'id': vault.id.toString(),
    'name': vault.name,
    'created': vault.createdAt.getTime(),
    'updated': vault.updatedAt.getTime(),
    'account_id': vault.accountId.toString(),
  }
}

function serializeVaultSummary(vaultSummary) {
  return {
    'object': 'vault_summary',
    'id': vaultSummary.id.toString(),
    'name': vaultSummary.name,
    'items_count': vaultSummary.itemsCount,
  }
}

function serializeObject(object) {
  if (object instanceof Vault) {
    return serializeVault(object);
  }
  if (object instanceof VaultSummary) {
    return serializeVaultSummary(object);
  }
}

function serializeArray(array) {
  if (array[0] instanceof VaultSummary) {
    return {
      'object': 'list',
      'data': array.map(serializeVaultSummary)
    };
  }
}

module.exports = {

  serialize(data) {
    if (!data) {
      throw new InfrastructureError('Serialization error');
    }
    if (Array.isArray(data)) {
      return serializeArray(data);
    }
    return serializeObject(data);
  }
};
