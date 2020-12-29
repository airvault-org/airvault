'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    website: DataTypes.STRING,
  }, {
    sequelize,
    tableName: 'items',
    modelName: 'Item',
  });
  return Item;
};
