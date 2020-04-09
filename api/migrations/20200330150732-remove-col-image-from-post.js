'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'posts',
        'image',
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'posts',
        'image',
        { type: Sequelize.STRING }
    );
  }
};
