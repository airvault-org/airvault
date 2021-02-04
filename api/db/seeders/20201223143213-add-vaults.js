const uuidv4 = require('uuid').v4;
const { Account } = require('../models');

module.exports = {

  up: async (queryInterface) => {
    const account = await Account.findOne();

    return queryInterface.bulkInsert('vaults', [{
      uuid: uuidv4(),
      name: 'Default',
      createdAt: new Date(),
      updatedAt: new Date(),
      accountId: account.id,
    }, {
      uuid: uuidv4(),
      name: 'Shared',
      createdAt: new Date(),
      updatedAt: new Date(),
      accountId: account.id,
    }]);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('vaults');
  }
};
