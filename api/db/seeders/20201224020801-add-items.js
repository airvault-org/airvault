const uuidv4 = require('uuid').v4;
const models = require('../models').default;
const { ItemType } = require('../../lib/domain/Item');
const { ItemCipherAesCdc256 } = require('../../lib/infrastructure/ciphers/ItemCipherAesCdc256');
const { environment } = require("../../config/environment");

module.exports = {

  up: async (queryInterface, Sequelize) => {

    const itemCypher = new ItemCipherAesCdc256(environment.default.items.cipher.key);

    const vault = await models.Vault.findOne();

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
