'use strict';

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    filter: {
      type: DataTypes.ENUM,
      values: ['general', 'witness', 'protocol', 'pro'],
      defaultValue: 'general',
      allowNull: false,
    },
    content: DataTypes.TEXT,
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
  }, {});

  Post.associate = function(User, Comment, Image) {
    Post.hasMany(Comment, {
      foreignKey: 'post_id',
      sourceKey: 'id',
      as: 'comments'
    });
    Post.hasMany(Image, {
      foreignKey: 'post_id',
      sourceKey: 'id',
      as: 'images'
    });

    Post.belongsTo(User, {
      foreignKey: 'user_id',
      targetKey: 'id',
      as: 'author'
    });
  };

  return Post;
};