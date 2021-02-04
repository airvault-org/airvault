const ItemRepository = require('../../domain/ItemRepository');
const Item = require('../../domain/Item');
const ItemList = require('../../domain/ItemList');
const { build } = require('./sql-repository-factory');
const models = require('../../../db/models');
const { Op } = require('sequelize');
const itemCipher = require('../ciphers/item-cipher-aes-cdc-256');

class ItemRepositorySql extends ItemRepository {

  async save(item) {
    const vaultModel = await models.Vault.findOne({ where: { uuid: item.vaultUuid }});

    let persistedModel;
    if (item.id) {
      persistedModel = await this.Model.findByPk(item.id);
      persistedModel.type = item.type;
      persistedModel.updatedAt = item.updatedAt;
      persistedModel.vaultId = vaultModel.id;
      persistedModel.content = itemCipher.encrypt(item.content);
      await persistedModel.save();
    } else {
      persistedModel = await this.Model.create({
        uuid: item.uuid,
        type: item.type,
        updatedAt: item.updatedAt,
        vaultId: vaultModel.id,
        content: itemCipher.encrypt(item.content),
      });
    }
    const decryptedItemContent = itemCipher.decrypt(persistedModel.content);
    const attributes = {
      id: persistedModel.id,
      uuid: persistedModel.uuid,
      type: persistedModel.type,
      createdAt: persistedModel.createdAt,
      updatedAt: persistedModel.updatedAt,
      vaultUuid: vaultModel.uuid,
      ...decryptedItemContent
    };
    return new Item(attributes);
  }

  async find({ accountId }) {
    const itemModels = await this.Model.findAll({
      include: {
        model: models['Vault'],
        attributes: ['uuid'],
        where: {
          accountId,
        }
      },
    });
    const itemEntities = itemModels.map(model => {
      const decryptedItemContent = itemCipher.decrypt(model.content);
      const attributes = {
        id: model.id,
        uuid: model.uuid,
        type: model.type,
        createdAt: model.createdAt,
        updatedAt: model.updatedAt,
        vaultUuid: model.Vault.uuid,
        ...decryptedItemContent
      };
      return new Item(attributes);
    })
    return new ItemList(itemEntities);
  }

  async findAllByVaultUuid(vaultUuid) {
    const itemModels = await this.Model.findAll({
      include: {
        model: models['Vault'],
        attributes: ['uuid'],
        where: {
          uuid: vaultUuid,
        }
      },
    });
    const itemEntities = itemModels.map(model => {
      const decryptedItemContent = itemCipher.decrypt(model.content);
      const attributes = {
        id: model.id,
        uuid: model.uuid,
        type: model.type,
        createdAt: model.createdAt,
        updatedAt: model.updatedAt,
        vaultUuid: model.Vault.uuid,
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

