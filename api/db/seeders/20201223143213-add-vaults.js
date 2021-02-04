const { Account } = require('../models');

module.exports = {

  up: async (queryInterface) => {

    const account = await Account.findOne();

    return queryInterface.bulkInsert('vaults', [{
      name: 'Default',
      createdAt: new Date(),
      updatedAt: new Date(),
      accountId: account.id,
    }, {
      name: 'Shared',
      createdAt: new Date(),
      updatedAt: new Date(),
      accountId: account.id,
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('vaults');
  }
};
