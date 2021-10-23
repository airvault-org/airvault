import { EntityRepository } from '../../domain/EntityRepository';
import { Entity } from '../../domain/Entity';
import { EntityList } from '../../domain/EntityList';
import { Model, ModelDefined, QueryTypes } from 'sequelize';

const models = require('../../../db/models');

abstract class GenericRepositorySql<E extends Entity> implements EntityRepository<E> {

  modelName: string;
  tableName: string;
  Model: ModelDefined<any, any>;

  protected constructor(Model: ModelDefined<any, any>, modelName: string, tableName: string) {
    this.modelName = modelName;
    this.tableName = tableName;
    this.Model = Model;
  }

  abstract fromModelToDto(model: Model): E;

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

  find(params: any): Promise<EntityList<E>> {
    throw new Error('Unimplemented method GenericRepositorySql#find');
  };

  findById(id: number): Promise<E | null> {
    throw new Error('Unimplemented method GenericRepositorySql#findById');
  };

  findByUuid(uuid: string): Promise<E | null> {
    throw new Error('Unimplemented method GenericRepositorySql#findByUuid');
  };

  async save(entity: E): Promise<E> {
    throw new Error('Unimplemented method GenericRepositorySql#save');
  };

}

export { GenericRepositorySql };
