'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Vaults', [{
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
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.dropTable('Vaults');
  }
};
