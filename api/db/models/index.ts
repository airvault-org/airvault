import { ModelDefined, Sequelize } from 'sequelize';
import { environment } from '../../config/environment';
import { DatabaseConfig, getDatabase } from '../../config/database.js';

import account from './account';
import item from './item';
import vault from './vault';

const config: DatabaseConfig = getDatabase(environment.name);

let sequelize: Sequelize;
if (config.url != null) {
  sequelize = new Sequelize(config.url, config);
} else {
  throw new Error('Missing database URL');
}

class DB {
  readonly _models: Map<string, ModelDefined<any, any>>;
  readonly sequelize: Sequelize;

  constructor(sequelize: Sequelize) {
    this._models = new Map<string, ModelDefined<any, any>>();
    this.sequelize = sequelize;
  }

  registerModel(name: string, model: ModelDefined<any, any>): void {
    this._models.set(name, model);
  }

  getModel(name: string): ModelDefined<any, any> {
    const model = this._models.get(name);
    if (!model) {
      throw new Error(`Model "${name}" not found in registered DB models.`);
    }
    return model;
  }
}

const db = new DB(sequelize);

const Account = account(db);
const Item = item(db);
const Vault = vault(db);

Account.hasMany(Vault, {
  foreignKey: 'accountId',
  as: 'vaults',
});

Vault.belongsTo(Account, {
  foreignKey: {
    name: 'accountId',
    allowNull: false
  },
});

Vault.hasMany(Item, {
  foreignKey: 'vaultId',
});

Item.belongsTo(Vault, {
  foreignKey: {
    name: 'vaultId',
    allowNull: false
  },
});

export {
  DB,
  db
};
