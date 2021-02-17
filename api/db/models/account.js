'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models['Vault'], {
        foreignKey: 'accountId'
      });
    }
  }
  Account.init({
    uuid: DataTypes.UUID,
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    encryptedPassword: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'accounts',
    modelName: 'Account',
  });
  return Account;
};
