const VaultRepository = require('../../domain/VaultRepository');
const Vault = require('../../domain/Vault');
const VaultSummary = require('../../domain/VaultSummary');
const { build } = require('./sql-repository-factory');

class VaultRepositorySql extends VaultRepository {

  async save(vault) {
    let persistedModel;
    if (vault.id) {
      persistedModel = await this.Model.findByPk(vault.id);
      persistedModel.name = vault.name;
      persistedModel.updatedAt = vault.updatedAt;
      persistedModel.accountId = vault.accountId;
      await persistedModel.save();
    } else {
      persistedModel = await this.Model.create(vault);
    }
    return new Vault(persistedModel);
  }

  async listAllUserVaultSummaries(accountId) {
    const models = await this.Model.findAll({ where: { accountId } });
    return models.map(model => new VaultSummary(model))
  }

  async getByIdAndAccountId(id, accountId) {
    const model = await this.Model.findOne({ where: { id, accountId } });
    if (model) {
      return new Vault(model);
    }
  }
}

module.exports = build({
  modelName: 'Vault',
  tableName: 'vaults',
  Entity: Vault,
  Repository: VaultRepositorySql
});
