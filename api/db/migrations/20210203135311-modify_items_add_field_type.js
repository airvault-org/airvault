'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'items',
      'type',
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'login'
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('items', 'type');
  }
};
