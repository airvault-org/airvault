const { InfrastructureError } = require('../errors');
const Item = require('../../domain/Item');

function serializeItem(item) {
  return {
    'object': 'item',
    'id': item.id.toString(),
    'username': item.username,
    'password': item.password,
    'website': item.website,
    'created': item.createdAt.getTime(),
    'updated': item.updatedAt.getTime(),
    'vault_id': item.vaultId.toString(),
  }
}

function serializeObject(object) {
  if (object instanceof Item) {
    return serializeItem(object);
  }
}

function serializeArray(array) {
  if (array[0] instanceof Item) {
    return {
      'object': 'list',
      'data': array.map(serializeItem)
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
