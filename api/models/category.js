'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    categoryName: {
      type: DataTypes.STRING
    }
  }, {});

  Category.associate = function(File) {
    Category.hasMany(File, {
      foreignKey: 'category_id',
      sourceKey: 'id',
      as: 'files'
    });
  };
  return Category;
};