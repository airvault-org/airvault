const { Sequelize } = require('sequelize');
const environment = require('../../config/environment');
const config = require('../../config/database.js')[environment.name];

const sequelize = new Sequelize(environment.db.url, config);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

const Account = require('./account').build(db);
const Item = require('./item').build(db);
const Vault = require('./vault').build(db);

Account.hasMany(Vault, {
  foreignKey: "accountId",
  as: "vaults",
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

module.exports = db;
