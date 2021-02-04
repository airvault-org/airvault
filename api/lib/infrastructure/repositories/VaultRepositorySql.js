const VaultRepository = require('../../domain/VaultRepository');
const Vault = require('../../domain/Vault');
const VaultSummary = require('../../domain/VaultSummary');
const { build } = require('./sql-repository-factory');
const models = require('../../../db/models');
const { QueryTypes } = require('sequelize');

class VaultRepositorySql extends VaultRepository {

  async save(vault) {
    const accountModel = await models.Account.findOne({ where: { uuid: item.accountUuid }});

    let persistedModel;
    if (vault.id) {
      persistedModel = await this.Model.findByPk(vault.id);
      persistedModel.name = vault.name;
      persistedModel.updatedAt = vault.updatedAt;
      persistedModel.accountId = accountModel.id;
      await persistedModel.save();
    } else {
      persistedModel = await this.Model.create(vault);
    }
    return new Vault(persistedModel);
  }

  async listAllUserVaultSummaries(accountId) {
    const data = await models.sequelize.query(`
SELECT v.*, (
  SELECT COUNT(*)
  FROM items
  WHERE "vaultId"=v.id
) AS "itemsCount"
FROM vaults as v
WHERE "accountId"=${accountId}
`, { type: QueryTypes.SELECT });
    return data.map(rowModel => new VaultSummary(rowModel));
  }

  async getByIdAndAccountId(id, accountId) {
    const model = await this.Model.findOne({ where: { id, accountId } });
    if (model) {
      return new Vault(model);
    }
  }

  async existsByIdAndAccountId(id, accountId) {
    const results = await models.sequelize.query(`SELECT 1 FROM ${this.tableName} where id=${id} and "accountId"=${accountId}`, { type: QueryTypes.SELECT });
    return results.length > 0;
  }
}

module.exports = build({
  modelName: 'Vault',
  tableName: 'vaults',
  Entity: Vault,
  Repository: VaultRepositorySql
});
