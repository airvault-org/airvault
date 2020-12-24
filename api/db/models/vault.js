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
      this.hasMany(models['Item']);
    }
  };
  Vault.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Vault',
  });
  return Vault;
};
