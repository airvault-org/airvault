const uuidv4 = require('uuid').v4;
const { Vault } = require('../models');
const ItemType = require('../../lib/domain/ItemType');
const itemCypher = require('../../lib/infrastructure/ciphers/item-cipher-aes-cdc-256');

module.exports = {

  up: async (queryInterface, Sequelize) => {

    const vault = await Vault.findOne();

    await queryInterface.bulkInsert('items', [{
      uuid: uuidv4(),
      type: ItemType.LOGIN,
      content: itemCypher.encrypt({
        title: 'Item 1',
        username: 'john.doe@example.com',
        password: 'P@$sw0rD',
        website: 'http://site1.com',
      }),
      createdAt: new Date(),
      updatedAt: new Date(),
      vaultId: vault.id,
    }, {
      uuid: uuidv4(),
      type: ItemType.LOGIN,
      content: itemCypher.encrypt({
        title: 'Item 2',
        username: 'john.doe@example.com',
        password: 'P@$sw0rD',
        website: 'http://site2.com',
      }),
      createdAt: new Date(),
      updatedAt: new Date(),
      vaultId: vault.id,
    }, {
      uuid: uuidv4(),
      type: ItemType.LOGIN,
      content: itemCypher.encrypt({
        title: 'Item 3',
        username: 'john.doe@example.com',
        password: 'P@$sw0rD',
        website: 'http://site3.com',
      }),
      createdAt: new Date(),
      updatedAt: new Date(),
      vaultId: vault.id,
    }]);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('items');
  }
};
