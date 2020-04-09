'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('posts', 'filter', {
          type: Sequelize.DataTypes.ENUM,
          values: ['general', 'witness ', 'protocol', 'pro'],
          allowNull: false,
          defaultValue: 'general'
        }, { transaction: t }),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'posts',
        'filters',
    );
  }
};