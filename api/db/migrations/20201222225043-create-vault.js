'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vaults', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      accountId: {
        type: Sequelize.DataTypes.INTEGER,

        references: {
          model: {
            tableName: 'accounts',
          },

          // This is the column name of the referenced model
          key: 'id',

          // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
          // Options:
          // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
          // - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
          // - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
        }
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('vaults');
  }
};
