import { InfrastructureError } from '../errors';
import { Item } from '../../domain/Item';

function serializeItem(item: Item) {
  return {
    'object': 'item',
    'id': item.uuid,
    'type': item.type,
    'title': item.content.title,
    'username': item.content.username,
    'password': item.content.password,
    'website': item.content.website,
    'created': item.createdAt.getTime(),
    'updated': item.updatedAt.getTime(),
    'vault_id': item.vaultUuid,
  }
}

function serializeObject(object: any) {
  if (object instanceof Item) {
    return serializeItem(object);
  }
}

function serializeArray(array: any[]) {
  if (array.length <= 0) {
    return {
      'object': 'list',
      'data': []
    };
  }
  if (array[0] instanceof Item) {
    return {
      'object': 'list',
      'data': array.map(serializeItem)
    };
  }
}

export default {

  serialize(data: any) {
    if (!data) {
      throw new InfrastructureError('Serialization error');
    }
    if (Array.isArray(data)) {
      return serializeArray(data);
    }
    return serializeObject(data);
  }
};
