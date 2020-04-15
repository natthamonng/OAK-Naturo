'use strict';
module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('File', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      values: ['published', 'unpublished'],
      defaultValue: 'published',
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
      },
      references: {
        model: 'users',
        key: 'id',
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
      },
      references: {
        model: 'categories',
        key: 'id',
      },
    }
  }, {});

  File.associate = function(User, Category) {
    File.belongsTo(User, {
      foreignKey: 'user_id',
      targetKey: 'id',
      as: 'author'
    });

    File.belongsTo(Category, {
      foreignKey: 'category_id',
      targetKey: 'id',
      as: 'category'
    });
  };

  return File;
};