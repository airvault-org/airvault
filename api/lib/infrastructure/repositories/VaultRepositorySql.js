const { QueryTypes } = require('sequelize');
const VaultRepository = require('../../domain/VaultRepository');
const Vault = require('../../domain/Vault');
const VaultSummary = require('../../domain/VaultSummary');
const models = require('../../../db/models');

class VaultRepositorySql extends VaultRepository {

  #Model;

  constructor() {
    super();
    this.#Model = models['Vault'];
  }

  async save(vault) {
    let persistedModel;
    if (vault.id) {
      persistedModel = await this.#Model.findByPk(vault.id);
      persistedModel.name = vault.name;
      persistedModel.updatedAt = vault.updatedAt;
      persistedModel.accountId = vault.accountId;
      await persistedModel.save();
    } else {
      persistedModel = await this.#Model.create(vault);
    }
    return new Vault(persistedModel);
  }

  async findById(id) {
    const accountModel = await this.#Model.findByPk(id);
    if (accountModel) {
      return new Vault(accountModel);
    }
  }

  async findAll() {
  }

  async delete(id) {
    return await this.#Model.destroy({ where: { id } });
  }

  async existsById(id) {
    const results = await models.sequelize.query(`SELECT 1 FROM vaults where id=${id}`, { type: QueryTypes.SELECT });
    return results.length > 0;
  }

  async listAllUserVaultSummaries(userId) {
    const vaultModels = await this.#Model.findAll({ where: { accountId: userId } });
    return vaultModels.map(model => new VaultSummary(model))
  }
}

module.exports = VaultRepositorySql;
