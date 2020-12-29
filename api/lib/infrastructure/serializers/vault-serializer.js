const { InfrastructureError } = require('../errors');
const VaultSummary = require('../../domain/VaultSummary');

function serializeVaultSummary(vaultSummary) {
  return {
    'object': 'vault_summary',
    'id': vaultSummary.id.toString(),
    'name': vaultSummary.name,
    'items_count': vaultSummary.itemsCount,
  }
}

function serializeObject(object) {
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
