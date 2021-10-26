import { Sequelize } from 'sequelize';
import { environment } from '../../config/environment';
import * as database from '../../config/database.js';
import account from './account';
import item from './item';
import vault from './vault';

const config: database.DatabaseConfig = database[environment.name as keyof database.Databases];

let sequelize: Sequelize;
if (config.url != null) {
  sequelize = new Sequelize(config.url, config);
} else {
  throw new Error('Missing database URL');
}

interface DB {
  sequelize: Sequelize,
  Sequelize: typeof Sequelize
}

const db: DB = {
  sequelize: sequelize,
  Sequelize: Sequelize
};

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

export default db;
