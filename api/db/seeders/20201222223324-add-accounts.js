const uuidv4 = require('uuid').v4;

module.exports = {

  up: async (queryInterface) => {
    return queryInterface.bulkInsert('accounts', [{
      uuid: uuidv4(),
      username: 'admin',
      encryptedPassword: '$2b$10$Qu.vR2Uffe3VvYTrWFirs.hZsPlmMlAX8pbWTRyM/C29K6/asAfN.',
      email: 'admin@example.net',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('accounts');
  }
};
