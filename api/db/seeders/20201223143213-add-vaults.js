const uuidv4 = require('uuid').v4;
const models = require('../models').default;

module.exports = {

  up: async (queryInterface) => {
    const account = await models.Account.findOne();

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
