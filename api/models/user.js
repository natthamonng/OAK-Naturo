'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        role: {
            type: DataTypes.ENUM,
            values: ['admin', 'partner', 'visitor'],
            defaultValue: 'visitor',
            allowNull: false,
        },
        resetPWDToken: {
            type: DataTypes.STRING
        },
        resetPWDExpires: {
            type: DataTypes.DATE
        }
    }, {});

    User.associate = function(Post, Comment) {

        User.hasMany(Post, {
            foreignKey: 'user_id',
            sourceKey: 'id',
            as: 'posts'
        });

        User.hasMany(Comment, {
            foreignKey: 'user_id',
            sourceKey: 'id',
            as: 'comments'
        });
    };

    return User;
};