'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('categories', 'status', {
          type: Sequelize.DataTypes.ENUM,
          values: ['published', 'unpublished '],
          allowNull: false,
          defaultValue: 'published'
        }, { transaction: t }),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'categories',
      'status',
    );
  }
};
