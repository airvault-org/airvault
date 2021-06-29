import {Model, QueryTypes} from 'sequelize';
import {GenericRepositorySql} from './GenericRepositorySql';
import {Vault} from '../../domain/Vault';
import {VaultRepository} from '../../domain/VaultRepository';
import {EntityList} from '../../domain/EntityList';

const models = require('../../../db/models');

class VaultRepositorySql extends GenericRepositorySql<Vault> implements VaultRepository {

  constructor() {
    super(models['Vault'], 'Vault', 'vaults');
  }

  fromModelToDto(model: Model): Vault {
    const attributes = {
      id: model.get('id') as number,
      uuid: model.get('uuid') as string,
      createdAt: model.get('createdAt') as Date,
      updatedAt: model.get('updatedAt') as Date,
      name: model.get('name') as string,
      accountUuid: (model.get('Account') as Model).get('uuid') as string,
    };
    return new Vault(attributes);
  }

  async save(vault: Vault) {
    const accountModel = await models.Account.findOne({where: {uuid: vault.accountUuid}});

    let persistedModel;
    if (vault.id) {
      persistedModel = await this.Model.findByPk(vault.id);
      if (!persistedModel) {
        throw new Error('An ID was passed but the vault seems to not exist')
      }
      persistedModel.set('name', vault.name);
      persistedModel.set('updatedAt', vault.updatedAt);
      persistedModel.set('accountId', accountModel.get('id'));
      await persistedModel.save();
    } else {
      persistedModel = await this.Model.create({
        uuid: vault.uuid,
        name: vault.name,
        createdAt: vault.createdAt,
        updatedAt: vault.updatedAt,
        accountId: accountModel.get('id')
      });
    }
    persistedModel.setDataValue('Account', accountModel);
    return this.fromModelToDto(persistedModel);
  }

  async find(params: { accountId: number }) {
    const dbModels = await this.Model.findAll({
      include: {
        model: models['Account'],
        attributes: ['uuid'],
        where: {
          accountId: params.accountId,
        }
      },
    });
    const entities = dbModels.map(this.fromModelToDto);
    return new EntityList<Vault>(entities);
  }

  async findByUuid(uuid: string) {
    const model = await this.Model.findOne({
      where: {uuid},
      include: {
        model: models['Account'],
        attributes: ['uuid'],
      },
    });
    if (model) {
      return this.fromModelToDto(model);
    }
    return null;
  }

  async findById(id: number) {
    const model = await this.Model.findByPk(id, {
      include: {
        model: models['Account'],
        attributes: ['uuid'],
      },
    });
    if (model) {
      return this.fromModelToDto(model);
    }
    return null;
  }

  async existsByUuidAndAccountId(uuid: string, accountId: number): Promise<boolean> {
    const results = await models.sequelize.query(`SELECT 1 FROM ${this.tableName} where uuid='${uuid}' and "accountId"=${accountId}`, {type: QueryTypes.SELECT});
    return results.length > 0;
  }

  async getByUuidAndAccountId(uuid: string, accountId: number) {
    const model = await this.Model.findOne({
      where: {uuid, accountId},
      include: {
        model: models['Account'],
        attributes: ['uuid'],
      },
    });
    if (model) {
      return this.fromModelToDto(model);
    }
    return null;
  }

}

export {VaultRepositorySql};
