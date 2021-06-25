const ItemRepository = require('../../domain/ItemRepository');
const { Item, ItemContent } = require('../../domain/Item');
const ItemList = require('../../domain/ItemList');
const { build } = require('./sql-repository-factory');
const models = require('../../../db/models');
const itemCipher = require('../ciphers/item-cipher-aes-cdc-256');

class ItemRepositorySql extends ItemRepository {

  async save(item) {
    const vaultModel = await models.Vault.findOne({ where: { uuid: item.vaultUuid } });

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
        vaultId: vaultModel.id,
        content: itemCipher.encrypt(item.content),
      });
    }
    const { title, username, password, website }  = itemCipher.decrypt(persistedModel.content);

    const content = new ItemContent(title, username, password, website);

    const attributes = {
      id: persistedModel.id,
      uuid: persistedModel.uuid,
      type: persistedModel.type,
      createdAt: persistedModel.createdAt,
      updatedAt: persistedModel.updatedAt,
      vaultUuid: vaultModel.uuid,
      content
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
      const { title, username, password, website } = itemCipher.decrypt(model.content);

      const content = new ItemContent(title, username, password, website);

      const attributes = {
        id: model.id,
        uuid: model.uuid,
        type: model.type,
        createdAt: model.createdAt,
        updatedAt: model.updatedAt,
        vaultUuid: model.Vault.uuid,
        content
      };
      return new Item(attributes);
    })
    return new ItemList(itemEntities);
  }

  async findByUuid(uuid) {
    const model = await this.Model.findOne({
      where: { uuid },
      include: {
        model: models['Vault'],
        attributes: ['uuid'],
      },
    });
    if (model) {
      model.vaultUuid = model.Vault.uuid;

      const { title, username, password, website } = itemCipher.decrypt(model.content);

      const content = new ItemContent(title, username, password, website);

      const attributes = {
        id: model.id,
        uuid: model.uuid,
        type: model.type,
        createdAt: model.createdAt,
        updatedAt: model.updatedAt,
        vaultUuid: model.Vault.uuid,
        content
      };
      return new Item(attributes);
    }
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
      const { title, username, password, website } = itemCipher.decrypt(model.content);

      const content = new ItemContent(title, username, password, website);

      const attributes = {
        id: model.id,
        uuid: model.uuid,
        type: model.type,
        createdAt: model.createdAt,
        updatedAt: model.updatedAt,
        vaultUuid: model.Vault.uuid,
        content
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

