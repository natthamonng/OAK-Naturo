'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'comments',
        'user_id',
        {
          type: Sequelize.INTEGER,
          validate: {
            notEmpty: true,
          },
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'comments',
        'user_id',
    );
  }
};