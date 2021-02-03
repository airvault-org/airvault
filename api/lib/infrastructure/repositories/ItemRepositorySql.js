const ItemRepository = require('../../domain/ItemRepository');
const Item = require('../../domain/Item');
const ItemList = require('../../domain/ItemList');
const { build } = require('./sql-repository-factory');
const models = require('../../../db/models');
const { Op } = require('sequelize');
const itemCipher = require('../ciphers/item-cipher-aes-cdc-256');

class ItemRepositorySql extends ItemRepository {

  async save(item) {
    let persistedModel;
    if (item.id) {
      persistedModel = await this.Model.findByPk(item.id);
      persistedModel.type = item.type;
      persistedModel.updatedAt = item.updatedAt;
      persistedModel.vaultId = item.vaultId;
      persistedModel.content = itemCipher.encrypt(item.content);
      await persistedModel.save();
    } else {
      persistedModel = await this.Model.create({
        type: item.type,
        updatedAt: item.updatedAt,
        vaultId: item.vaultId,
        content: itemCipher.encrypt(item.content),
      });
    }
    const decryptedItemContent = itemCipher.decrypt(persistedModel.content);
    const attributes = {
      id: persistedModel.id,
      type: persistedModel.type,
      createdAt: persistedModel.createdAt,
      updatedAt: persistedModel.updatedAt,
      vaultId: persistedModel.vaultId,
      ...decryptedItemContent
    };
    return new Item(attributes);
  }

  async find({ accountId, query }) {
    let queryWhereClause;
    if (query) {
      const search = `%${query.trim()}%`;
      queryWhereClause = {
        [Op.or]: [
          { title: { [Op.iLike]: search }, },
          { username: { [Op.iLike]: search }, },
          { website: { [Op.iLike]: search }, },
        ]
      };
    }
    const itemModels = await this.Model.findAll({
      where: queryWhereClause,
      include: {
        model: models['Vault'],
        attributes: [],
        where: {
          accountId,
        }
      },
    });
    const itemEntities = itemModels.map(model => {
      const decryptedItemContent = itemCipher.decrypt(model.content);
      const attributes = {
        id: model.id,
        type: model.type,
        createdAt: model.createdAt,
        updatedAt: model.updatedAt,
        vaultId: model.vaultId,
        ...decryptedItemContent
      };
      return new Item(attributes);
    })
    return new ItemList(itemEntities);
  }

  async findAllByVaultId(vaultId) {
    const itemModels = await this.Model.findAll({ where: { vaultId } });
    const itemEntities = itemModels.map(model => {
      const decryptedItemContent = itemCipher.decrypt(model.content);
      const attributes = {
        id: model.id,
        type: model.type,
        createdAt: model.createdAt,
        updatedAt: model.updatedAt,
        vaultId: model.vaultId,
        ...decryptedItemContent
      };
      return new Item(attributes);
    })
    return new ItemList(itemEntities);
  }

}

module.exports = build({
  modelName: 'Item',
  tableName: 'items',
  Entity: Item,
  Repository: ItemRepositorySql
});

