import {GenericRepositorySql} from './GenericRepositorySql';
import {Account} from '../../domain/Account';
import {Model} from 'sequelize';
import {AccountWithEncryptedPassword} from '../../domain/AccountWithEncryptedPassword';
import {AccountRepository} from '../../domain/AccountRepository';

const models = require('../../../db/models');

class AccountRepositorySql extends GenericRepositorySql<Account> implements AccountRepository {

  constructor() {
    super(models['Account'], 'Account', 'accounts');
  }

  fromModelToDto(model: Model): Account {
    const attributes = {
      id: model.get('id') as number,
      uuid: model.get('uuid') as string,
      createdAt: model.get('createdAt') as Date,
      updatedAt: model.get('updatedAt') as Date,
      name: model.get('name') as string,
      username: model.get('username') as string,
      email: model.get('email') as string,
    };
    return new Account(attributes);
  }

  async findById(id: number) {
    const model = await this.Model.findByPk(id);
    if (model) {
      return this.fromModelToDto(model);
    }
    return null;
  }

  async save(account: Account) {
    let persistedModel;
    if (account.id) {
      persistedModel = await this.Model.findByPk(account.id);
      if (!persistedModel) {
        throw new Error('An ID was passed but the account seems to not exist')
      }
      persistedModel.set('name', account.name);
      persistedModel.set('username', account.username);
      persistedModel.set('email', account.email);
      persistedModel.set('updatedAt', account.updatedAt);
      await persistedModel.save();
    } else {
      persistedModel = await this.Model.create({
        uuid: account.uuid,
        name: account.name,
        username: account.username,
        email: account.email,
        encryptedPassword: (account as AccountWithEncryptedPassword).encryptedPassword,
      });
    }
    return this.fromModelToDto(persistedModel);
  }

  async findAccountWithEncryptedPasswordByEmail(email: string) {
    const accountModel = await this.Model.findOne({where: {email}});
    if (accountModel) {
      const account: AccountWithEncryptedPassword = this.fromModelToDto(accountModel);
      account.encryptedPassword = accountModel.get('encryptedPassword') as string;
      return account;
    }
    return null;
  }

  async isUsernameAvailable(username: string) {
    const account = await this.Model.findOne({where: {username}});
    return !account;
  }

  async isEmailAvailable(email: string) {
    const account = await this.Model.findOne({where: {email}});
    return !account;
  }

}

export {AccountRepositorySql};
