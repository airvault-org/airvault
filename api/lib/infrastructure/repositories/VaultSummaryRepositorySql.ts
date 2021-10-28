import { Model, QueryTypes } from 'sequelize';
import { GenericRepositorySql } from './GenericRepositorySql';
import { VaultSummary } from '../../domain/VaultSummary';
import { VaultSummaryRepository } from '../../domain/VaultSummaryRepository';
import { EntityList } from '../../domain/EntityList';
import { db } from '../../../db/models';

class VaultSummaryRepositorySql extends GenericRepositorySql<VaultSummary> implements VaultSummaryRepository {

  constructor() {
    super(db.getModel('Vault'), 'Vault', 'vaults');
  }

  fromModelToDto(model: Model): VaultSummary {
    const attributes = {
      id: model.get('id') as number,
      uuid: model.get('uuid') as string,
      name: model.get('name') as string,
      itemsCount: model.get('itemCounts') as number,
    };
    return new VaultSummary(attributes);
  }

  async listAllUserVaultSummaries(accountId: number) {
    const data = await db.sequelize.query(`
SELECT v.*, (
  SELECT COUNT(*)
  FROM items
  WHERE "vaultId"=v.id
) AS "itemsCount"
FROM vaults as v
WHERE "accountId"=${accountId}
`, {type: QueryTypes.SELECT});
    const vaultSummaries = data.map((rowModel: any) => {
      return new VaultSummary(rowModel);
    });
    return new EntityList<VaultSummary>(vaultSummaries);
  }

}

export { VaultSummaryRepositorySql };
