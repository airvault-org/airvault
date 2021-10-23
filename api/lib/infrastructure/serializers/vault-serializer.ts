import { InfrastructureError } from '../errors';
import { Vault } from '../../domain/Vault';
import { VaultSummary } from '../../domain/VaultSummary';

function serializeVault(vault: Vault) {
  return {
    'object': 'vault',
    'id': vault.uuid,
    'name': vault.name,
    'created': vault.createdAt.getTime(),
    'updated': vault.updatedAt.getTime(),
    'account_id': vault.accountUuid,
  }
}

function serializeVaultSummary(vaultSummary: VaultSummary) {
  return {
    'object': 'vault_summary',
    'id': vaultSummary.uuid,
    'name': vaultSummary.name,
    'items_count': vaultSummary.itemsCount,
  }
}

function serializeObject(object: any) {
  if (object instanceof Vault) {
    return serializeVault(object);
  }
  if (object instanceof VaultSummary) {
    return serializeVaultSummary(object);
  }
}

function serializeArray(array: any[]) {
  if (array[0] instanceof VaultSummary) {
    return {
      'object': 'list',
      'data': array.map(serializeVaultSummary)
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
