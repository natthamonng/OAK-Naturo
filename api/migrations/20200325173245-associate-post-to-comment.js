'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'comments',
        'post_id',
        {
          type: Sequelize.INTEGER,
          validate: {
            notEmpty: true,
          },
          references: {
            model: 'posts',
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
        'post_id',
    );
  }
};