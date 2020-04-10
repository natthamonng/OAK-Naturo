'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('comments', 'status', {
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
        'comments',
        'status',
    );
  }
};