import {EntityRepository} from '../../domain/EntityRepository';
import {Entity} from '../../domain/Entity';
import {EntityList} from '../../domain/EntityList';
import {ModelDefined, QueryTypes} from 'sequelize';
const models = require('../../../db/models');

abstract class GenericRepositorySql<E extends Entity, L extends EntityList<E>> implements EntityRepository<E, L> {

  modelName: string;
  tableName: string;
  Model: ModelDefined<any, any>;

  protected constructor(Model:ModelDefined<any, any>, modelName: string, tableName: string) {
    this.modelName = modelName;
    this.tableName = tableName;
    this.Model = Model;
  }

  async delete(id: number): Promise<void> {
    await this.Model.destroy({where: {id}});
  }

  async deleteByUuid(uuid: string): Promise<void> {
    await this.Model.destroy({where: {uuid}});
  }

  async existsById(id: number): Promise<boolean> {
    const results = await models.sequelize.query(`SELECT 1 FROM ${this.tableName} where id=${id}`, {type: QueryTypes.SELECT});
    return results.length > 0;
  }

  async existsByUuid(uuid: string): Promise<boolean> {
    const results = await models.sequelize.query(`SELECT 1 FROM ${this.tableName} where uuid='${uuid}'`, {type: QueryTypes.SELECT});
    return results.length > 0;
  }

  abstract find(params: any): Promise<L>;

  abstract findById(id: number): Promise<E | null>;

  abstract findByUuid(uuid: string): Promise<E | null>;

  abstract save(entity: E): Promise<E>;

}

export {GenericRepositorySql};
