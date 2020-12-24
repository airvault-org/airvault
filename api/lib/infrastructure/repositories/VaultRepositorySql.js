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

  async save(account) {
    let persistedModel;
    if (account.id) {
      persistedModel = await this.#Model.findByPk(account.id);
      persistedModel.name = account.name;
      persistedModel.updatedAt = account.updatedAt;
      await persistedModel.save();
    } else {
      persistedModel = await this.#Model.create(account);
    }
    return new Vault(persistedModel);
  }

  async findById(id) {
    const accountModel = await this.#Model.findByPk(id);
    return new Vault(accountModel);
  }

  async findAll() {
  }

  async delete(id) {
    return await this.#Model.destroy({ where: { id } });
  }

  async existsById(id) {
    return await models.sequelize.query('SELECT 1 FROM `Vaults`', { type: QueryTypes.SELECT });
  }

  async listAllUserVaultSummaries(userId) {
    const vaultModels = await this.#Model.findAll();
    const vaultEntities = vaultModels.map(model => new VaultSummary(model))
    return vaultEntities;
  }
}

module.exports = VaultRepositorySql;
