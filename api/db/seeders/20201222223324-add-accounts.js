'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('accounts', [{
      username: 'admin',
      encryptedPassword: '$2b$10$Qu.vR2Uffe3VvYTrWFirs.hZsPlmMlAX8pbWTRyM/C29K6/asAfN.',
      email: 'admin@example.net',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('accounts');
  }
};
