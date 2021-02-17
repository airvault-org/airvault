const AccountRepository = require('../../domain/AccountRepository');
const Account = require('../../domain/Account');
const AccountWithEncryptedPassword = require('../../domain/AccountWithEncryptedPassword');
const { build } = require('./sql-repository-factory');

class AccountRepositorySql extends AccountRepository {

  async save(account) {
    let persistedModel;
    if (account.id) {
      persistedModel = await this.Model.findByPk(account.id);
      persistedModel.name = account.name;
      persistedModel.username = account.username;
      persistedModel.email = account.email;
      persistedModel.updatedAt = account.updatedAt;
      await persistedModel.save();
    } else {
      persistedModel = await this.Model.create({
        uuid: account.uuid,
        name: account.name,
        username: account.username,
        email: account.email,
        encryptedPassword: account.encryptedPassword,
      });
    }
    return new Account(persistedModel);
  }

  async findAccountWithEncryptedPasswordByEmail(email) {
    const accountModel = await this.Model.findOne({ where: { email } });
    if (accountModel) {
      return new AccountWithEncryptedPassword(accountModel);
    }
  }

  async isUsernameAvailable(username) {
    const account = await this.Model.findOne({ where: { username } });
    return !account;
  }

  async isEmailAvailable(email) {
    const account = await this.Model.findOne({ where: { email } });
    return !account;
  }

}

module.exports = build({
  modelName: 'Account',
  tableName: 'accounts',
  Entity: Account,
  Repository: AccountRepositorySql
});
