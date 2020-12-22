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
    if (pass.id && await this.existsById(pass.id)) {
      persistedModel = await this.#Model.update({
        login: pass.login,
        password: pass.password,
        url: pass.url,
        updatedAt: new Date(),
      }, { where: { id: pass.id } });
    } else {
      persistedModel = await this.#Model.create({
        login: pass.login,
        password: pass.password,
        url: pass.url,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    const persistedPass = new Pass(persistedModel);
    return persistedPass;
  }

  async findById(id) {
    const passModel = await this.#Model.findByPk(id);
    const pass = new Pass(passModel);
    return pass;
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
