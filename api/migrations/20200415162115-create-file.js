'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Files', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM,
        values: ['published', 'unpublished'],
        defaultValue: 'published',
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: true,
        },
        references: {
          model: 'users',
          key: 'id',
        },
      },
      category_id: {
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: true,
        },
        references: {
          model: 'categories',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Files');
  }
};