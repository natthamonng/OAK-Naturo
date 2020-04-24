'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('files', 'editor_id', {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true,
          defaultValue: null,
            references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }, { transaction: t }),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'files',
        'editor_id',
    );
  }
};
