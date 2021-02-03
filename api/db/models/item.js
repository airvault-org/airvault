'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models['Vault'], {
        foreignKey: {
          name: 'vaultId',
          allowNull: false
        }
      });
    }
  }

  Item.init({
    type: DataTypes.STRING,
    content: DataTypes.STRING,
  }, {
    sequelize,
    tableName: 'items',
    modelName: 'Item',
  });
  return Item;
};
