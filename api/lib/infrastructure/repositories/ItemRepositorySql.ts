import {ItemRepository} from '../../domain/ItemRepository';
import {Item, ItemContent, ItemType} from '../../domain/Item';
import {ItemList} from '../../domain/ItemList';
import {Model, ModelDefined, QueryTypes} from 'sequelize';

const models = require('../../../db/models');
const itemCipher = require('../ciphers/item-cipher-aes-cdc-256');

class ItemRepositorySql implements ItemRepository {

  modelName: string;
  tableName: string;
  Model: ModelDefined<any, any>;

  constructor() {
    this.modelName = 'Item';
    this.tableName = 'items';
    this.Model = models['Item'];
  }

  async save(item: Item): Promise<Item> {
    const vaultModel = await models.Vault.findOne({where: {uuid: item.vaultUuid}});

    let persistedModel: Model | null;
    if (item.id) {
      persistedModel = await this.Model.findByPk(item.id);
      if (!persistedModel) {
        throw new Error('An ID was passed but the item seems to not exist')
      }
      persistedModel.set('type', item.type);
      persistedModel.set('updatedAt', item.updatedAt);
      persistedModel.set('vaultId', vaultModel.id);
      persistedModel.set('content', itemCipher.encrypt(item.content));
      await persistedModel.save();
    } else {
      persistedModel = await this.Model.create({
        uuid: item.uuid,
        type: item.type,
        vaultId: vaultModel.id,
        content: itemCipher.encrypt(item.content),
      });
    }
    const {title, username, password, website} = itemCipher.decrypt(persistedModel.get('content'));

    const content = new ItemContent(title, username, password, website);

    const attributes = {
      id: persistedModel.get('id') as number,
      uuid: persistedModel.get('uuid') as string,
      type: persistedModel.get('type') as ItemType,
      createdAt: persistedModel.get('createdAt') as Date,
      updatedAt: persistedModel.get('updatedAt') as Date,
      vaultUuid: vaultModel.get('uuid') as string,
      content
    };
    return new Item(attributes);
  }

  async find(params: { accountId: number }) {
    const itemModels = await this.Model.findAll({
      include: {
        model: models['Vault'],
        attributes: ['uuid'],
        where: {
          accountId: params.accountId,
        }
      },
    });
    const itemEntities = itemModels.map(model => {
      const {title, username, password, website} = itemCipher.decrypt(model.get('content'));

      const content = new ItemContent(title, username, password, website);

      const attributes = {
        id: model.get('id') as number,
        uuid: model.get('uuid') as string,
        type: model.get('type') as ItemType,
        createdAt: model.get('createdAt') as Date,
        updatedAt: model.get('updatedAt') as Date,
        vaultUuid: (model.get('Vault') as Model).get('uuid') as string,
        content
      };
      return new Item(attributes);
    })
    return new ItemList(itemEntities);
  }

  async findByUuid(uuid: string) {
    const model = await this.Model.findOne({
      where: {uuid},
      include: {
        model: models['Vault'],
        attributes: ['uuid'],
      },
    });
    if (model) {
      model.set('vaultUuid', model.get('Vault.uuid'));

      const {title, username, password, website} = itemCipher.decrypt(model.get('content'));

      const content = new ItemContent(title, username, password, website);

      const attributes = {
        id: model.get('id') as number,
        uuid: model.get('uuid') as string,
        type: model.get('type') as ItemType,
        createdAt: model.get('createdAt') as Date,
        updatedAt: model.get('updatedAt') as Date,
        vaultUuid: (model.get('Vault') as Model).get('uuid') as string,
        content
      };
      return new Item(attributes);
    }
  }

  async findAllByVaultUuid(vaultUuid: string) {
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
      const {title, username, password, website} = itemCipher.decrypt(model.get('content'));

      const content = new ItemContent(title, username, password, website);

      const attributes = {
        id: model.get('id') as number,
        uuid: model.get('uuid') as string,
        type: model.get('type') as ItemType,
        createdAt: model.get('createdAt') as Date,
        updatedAt: model.get('updatedAt') as Date,
        vaultUuid: (model.get('Vault') as Model).get('uuid') as string,
        content
      };
      return new Item(attributes);
    })
    return new ItemList(itemEntities);
  }

  async delete(id: number): Promise<void> {
    await this.Model.destroy({where: {id}});
  }

  async deleteByUuid(uuid: string): Promise<void> {
    await this.Model.destroy({ where: { uuid } });
  }

  async existsById(id: number): Promise<boolean> {
    const results = await models.sequelize.query(`SELECT 1 FROM ${this.tableName} where id=${id}`, {type: QueryTypes.SELECT});
    return results.length > 0;
  }

  async existsByUuid(uuid: string): Promise<boolean> {
    const results = await models.sequelize.query(`SELECT 1 FROM ${this.tableName} where uuid='${uuid}'`, { type: QueryTypes.SELECT });
    return results.length > 0;
  }

  async findById(id: number): Promise<Item | undefined> {
    const model = await this.Model.findByPk(id, {
      include: {
        model: models['Vault'],
        attributes: ['uuid'],
      },
    });
    if (model) {
      model.set('vaultUuid', model.get('Vault.uuid'));

      const {title, username, password, website} = itemCipher.decrypt(model.get('content'));

      const content = new ItemContent(title, username, password, website);

      const attributes = {
        id: model.get('id') as number,
        uuid: model.get('uuid') as string,
        type: model.get('type') as ItemType,
        createdAt: model.get('createdAt') as Date,
        updatedAt: model.get('updatedAt') as Date,
        vaultUuid: (model.get('Vault') as Model).get('uuid') as string,
        content
      };
      return new Item(attributes);
    }
  }

}

export { ItemRepositorySql };
