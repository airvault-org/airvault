'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vault extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models['Account'], {
        foreignKey: {
          name: 'accountId',
          allowNull: false
        }
      });
      this.hasMany(models['Item'], {
        foreignKey: 'vaultId'
      });
    }
  }

  Vault.init({
    uuid: DataTypes.UUID,
    name: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'vaults',
    modelName: 'Vault',
  });
  return Vault;
};
