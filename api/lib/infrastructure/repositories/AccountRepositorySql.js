const { QueryTypes } = require('sequelize');
const AccountRepository = require('../../domain/AccountRepository');
const Account = require('../../domain/Account');
const AccountWithEncryptedPassword = require('../../domain/AccountWithEncryptedPassword');
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
      persistedModel.encryptedPassword = account.encryptedPassword;
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

  async findAccountWithEncryptedPasswordByUsername(username) {
    const accountModel = await this.#Model.findOne({ where: { username } });
    return new AccountWithEncryptedPassword(accountModel);
  }

  async findAll() {
  }

  async delete(id) {
    return await this.#Model.destroy({ where: { id } });
  }

  async existsById(id) {
    const results = await models.sequelize.query(`SELECT 1 FROM accounts where id=${id}`, { type: QueryTypes.SELECT });
    return results.length > 0;
  }

  async isUsernameAvailable(username) {
    const account = await this.#Model.findOne({ where: { username } });
    return !account;
  }

  async isEmailAvailable(email) {
    const account = await this.#Model.findOne({ where: { email } });
    return !account;
  }

}

module.exports = AccountRepositorySql;
