const models = require('../../../db/models');
const { QueryTypes } = require('sequelize');

function build({ Entity, Repository, tableName, modelName } = {}) {

  const Model = models[modelName];

  Repository.prototype.Entity = Entity;

  Repository.prototype.tableName = tableName;

  Repository.prototype.modelName = modelName;

  Repository.prototype.Model = Model;

  Repository.prototype.findById = async (id) => {
    const model = await Model.findByPk(id);
    if (model) {
      return new Entity(model);
    }
  }

  Repository.prototype.findByUuid = async (uuid) => {
    const model = await Model.findOne({ where: { uuid }});
    if (model) {
      return new Entity(model);
    }
  }

  Repository.prototype.existsById = async (id) => {
    const results = await models.sequelize.query(`SELECT 1 FROM ${tableName} where id=${id}`, { type: QueryTypes.SELECT });
    return results.length > 0;
  }

  Repository.prototype.existsByUuid = async (uuid) => {
    const results = await models.sequelize.query(`SELECT 1 FROM ${tableName} where uuid='${uuid}'`, { type: QueryTypes.SELECT });
    return results.length > 0;
  }

  Repository.prototype.delete = async (id) => {
    return await Model.destroy({ where: { id } });
  }

  Repository.prototype.deleteByUuid = async (uuid) => {
    return await Model.destroy({ where: { uuid } });
  }

  return Repository;
}

module.exports = {
  build
};
