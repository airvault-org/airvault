const { QueryTypes } = require('sequelize');
const PassRepository = require('../../domain/PassRepository');
const Pass = require('../../domain/Pass');
const PassList = require('../../domain/PassList');
const models = require('../../../db/models');

class PassRepositorySql extends PassRepository {

  #Model;

  constructor() {
    super();
    this.#Model = models['Pass'];
  }

  async save(pass) {
    let persistedModel;
    if (pass.id) {
      persistedModel = await this.#Model.findByPk(pass.id);
      persistedModel.login = pass.login;
      persistedModel.password = pass.password;
      persistedModel.url = pass.url;
      persistedModel.updatedAt = pass.updatedAt;
      await persistedModel.save();
    } else {
      persistedModel = await this.#Model.create(pass);
    }
    return new Pass(persistedModel);
  }

  async findById(id) {
    const passModel = await this.#Model.findByPk(id);
    return new Pass(passModel);
  }

  async findAll() {
    const passModels = await this.#Model.findAll();
    const passEntities = passModels.map(model => new Pass(model))
    return new PassList(passEntities);
  }

  async delete(id) {
    return await this.#Model.destroy({ where: { id } });
  }

  async existsById(id) {
    return await models.sequelize.query('SELECT 1 FROM `Passes`', { type: QueryTypes.SELECT });
  }
}

module.exports = PassRepositorySql;
