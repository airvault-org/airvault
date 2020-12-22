const { QueryTypes } = require('sequelize');
const AccountRepository = require('../../domain/AccountRepository');
const Account = require('../../domain/Account');
const models = require('../../../db/models');

class AccountRepositorySql extends AccountRepository {

  #Model;

  constructor() {
    super();
    this.#Model = models['Account'];
  }

  async save(account) {
    let persistedModel;
    if (account.id) {
      persistedModel = await this.#Model.findByPk(account.id);
      persistedModel.username = account.username;
      persistedModel.password = account.password;
      persistedModel.email = account.email;
      persistedModel.updatedAt = account.updatedAt;
      await persistedModel.save();
    } else {
      persistedModel = await this.#Model.create(account);
    }
    return new Account(persistedModel);
  }

  async findById(id) {
    const accountModel = await this.#Model.findByPk(id);
    return new Account(accountModel);
  }

  async findAll() {
  }

  async delete(id) {
    return await this.#Model.destroy({ where: { id } });
  }

  async existsById(id) {
    return await models.sequelize.query('SELECT 1 FROM `Accounts`', { type: QueryTypes.SELECT });
  }
}

module.exports = AccountRepositorySql;
