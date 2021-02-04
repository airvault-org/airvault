'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('vaults', [{
      name: 'Default',
      createdAt: new Date(),
      updatedAt: new Date(),
      accountId: 1,
    }, {
      name: 'Shared',
      createdAt: new Date(),
      updatedAt: new Date(),
      accountId: 1,
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('vaults');
  }
};
