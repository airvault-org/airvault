'use strict';
const ItemType = require('../../lib/domain/ItemType');
const itemCypher = require('../../lib/infrastructure/ciphers/item-cipher-aes-cdc-256');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('items', [{
      type: ItemType.LOGIN,
      content: itemCypher.encrypt({
        title: 'Item 1',
        username: 'john.doe@example.com',
        password: 'P@$sw0rD',
        website: 'http://site1.com',
      }),
      createdAt: new Date(),
      updatedAt: new Date(),
      vaultId: 1,
    }, {
      type: ItemType.LOGIN,
      content: itemCypher.encrypt({
        title: 'Item 2',
        username: 'john.doe@example.com',
        password: 'P@$sw0rD',
        website: 'http://site2.com',
      }),
      createdAt: new Date(),
      updatedAt: new Date(),
      vaultId: 1,
    }, {
      type: ItemType.LOGIN,
      content: itemCypher.encrypt({
        title: 'Item 3',
        username: 'john.doe@example.com',
        password: 'P@$sw0rD',
        website: 'http://site3.com',
      }),
      createdAt: new Date(),
      updatedAt: new Date(),
      vaultId: 1,
    }]);

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('items');
  }
};
