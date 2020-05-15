'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment: DataTypes.TEXT,
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
    status: {
      type: DataTypes.ENUM,
      values: ['published', 'unpublished'],
      defaultValue: 'published',
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
      },
      references: {
        model: 'posts',
        key: 'id',
      },
    },
  }, {});

  Comment.associate = function(User, Post) {

    Comment.belongsTo(User, {
      foreignKey: 'user_id',
      targetKey: 'id',
      as: 'author'
    });

    Comment.belongsTo(Post, {
      foreignKey: 'post_id',
      targetKey: 'id',
      as: 'post'
    });
  };
  return Comment;
};