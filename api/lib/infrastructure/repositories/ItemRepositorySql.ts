import {Item, ItemContent, ItemType} from '../../domain/Item';
import {Model} from 'sequelize';
import {GenericRepositorySql} from './GenericRepositorySql';
import {ItemRepository} from '../../domain/ItemRepository';
import {EntityList} from '../../domain/EntityList';
import {ItemCipherAesCdc256} from '../ciphers/ItemCipherAesCdc256';

const models = require('../../../db/models');

class ItemRepositorySql extends GenericRepositorySql<Item> implements ItemRepository {

  itemCipher: ItemCipherAesCdc256;

  constructor(itemCipher:ItemCipherAesCdc256) {
    super(models['Item'], 'Item', 'items');
    this.itemCipher = itemCipher;
  }

  fromModelToDto(model: Model): Item {
    const {title, username, password, website} = this.itemCipher.decrypt(model.get('content') as string);

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

  async save(item: Item) {
    const vaultModel = await models.Vault.findOne({where: {uuid: item.vaultUuid}});

    let persistedModel: Model | null;
    if (item.id) {
      persistedModel = await this.Model.findByPk(item.id);
      if (!persistedModel) {
        throw new Error('An ID was passed but the item seems to not exist')
      }
      persistedModel.set('type', item.type);
      persistedModel.set('updatedAt', item.updatedAt);
      persistedModel.set('vaultId', vaultModel.get('id'));
      persistedModel.set('content', this.itemCipher.encrypt(item.content));
      await persistedModel.save();
    } else {
      persistedModel = await this.Model.create({
        uuid: item.uuid,
        type: item.type,
        vaultId: vaultModel.get('id'),
        content: this.itemCipher.encrypt(item.content),
      });
    }
    persistedModel.setDataValue('Vault', vaultModel);
    return this.fromModelToDto(persistedModel);
  }

  async find(params: { accountId: number }) {
    const dbModels = await this.Model.findAll({
      include: {
        model: models['Vault'],
        attributes: ['uuid'],
        where: {
          accountId: params.accountId,
        }
      },
    });
    const entities = dbModels.map((model:Model<any>) => this.fromModelToDto(model));
    return new EntityList<Item>(entities);
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
      return this.fromModelToDto(model);
    }
    return null;
  }

  async findAllByVaultUuid(vaultUuid: string) {
    const dbModels = await this.Model.findAll({
      include: {
        model: models['Vault'],
        attributes: ['uuid'],
        where: {
          uuid: vaultUuid,
        }
      },
    });
    const entities = dbModels.map((model: Model<any>) => this.fromModelToDto(model));
    return new EntityList<Item>(entities);
  }

  async findById(id: number) {
    const model = await this.Model.findByPk(id, {
      include: {
        model: models['Vault'],
        attributes: ['uuid'],
      },
    });
    if (model) {
      return this.fromModelToDto(model);
    }
    return null;
  }

}

export {ItemRepositorySql};
