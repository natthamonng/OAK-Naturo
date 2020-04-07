'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment: DataTypes.STRING,
    user_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
      },
      references: {
        model: 'User',
        key: 'id',
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
      },
      references: {
        model: 'Post',
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