'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
        'comments',
        'comment',
        {
          type: Sequelize.TEXT,
          allowNull: false
        }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
        'comments',
        'comment',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
    )
  }
};
