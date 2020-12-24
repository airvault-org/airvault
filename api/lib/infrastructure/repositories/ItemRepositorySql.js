const { QueryTypes } = require('sequelize');
const ItemRepository = require('../../domain/ItemRepository');
const Item = require('../../domain/Item');
const ItemList = require('../../domain/ItemList');
const models = require('../../../db/models');

class ItemRepositorySql extends ItemRepository {

  #Model;

  constructor() {
    super();
    this.#Model = models['Item'];
  }

  async save(item) {
    let persistedModel;
    if (item.id) {
      persistedModel = await this.#Model.findByPk(item.id);
      persistedModel.username = item.username;
      persistedModel.password = item.password;
      persistedModel.website = item.website;
      persistedModel.updatedAt = item.updatedAt;
      persistedModel.vaultId = item.vaultId;
      await persistedModel.save();
    } else {
      persistedModel = await this.#Model.create(item);
    }
    return new Item(persistedModel);
  }

  async findById(id) {
    const itemModel = await this.#Model.findByPk(id);
    return new Item(itemModel);
  }

  async findAll() {
    const itemModels = await this.#Model.findAll();
    const itemEntities = itemModels.map(model => new Item(model))
    return new ItemList(itemEntities);
  }

  async findAllByVaultId(vaultId) {
    const itemModels = await this.#Model.findAll({ where: { vaultId } });
    const itemEntities = itemModels.map(model => new Item(model))
    return new ItemList(itemEntities);
  }

  async delete(id) {
    return await this.#Model.destroy({ where: { id } });
  }

  async existsById(id) {
    return await models.sequelize.query('SELECT 1 FROM `Items`', { type: QueryTypes.SELECT });
  }
}

module.exports = ItemRepositorySql;
