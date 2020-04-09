'use strict';

module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    name: DataTypes.STRING,
    image: DataTypes.BLOB('long'),
    post_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
      },
      references: {
        model: 'posts',
        key: 'id',
      },
    }
  }, {});
  Image.associate = function(Post) {
    // associations can be defined here
    Image.belongsTo(Post, {
      foreignKey: 'post_id',
      targetKey: 'id',
      as: 'post'
    });
  };
  return Image;
};