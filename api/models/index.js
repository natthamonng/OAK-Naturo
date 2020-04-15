'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const dbConfig = require('../config/config.js')[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

// Connect all the models/tables in the database to a db object,
// so everything is accessible via one object.
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./user')(sequelize, Sequelize);
db.posts = require('./post')(sequelize, Sequelize);
db.comments = require('./comment')(sequelize, Sequelize);
db.images = require('./image')(sequelize, Sequelize);
db.categories = require('./category')(sequelize, Sequelize);
db.files = require('./file')(sequelize, Sequelize);

db.users.associate(db.posts, db.comments, db.files);
db.posts.associate(db.users, db.comments, db.images);
db.comments.associate(db.users, db.posts);
db.images.associate(db.posts);
db.categories.associate(db.files);
db.files.associate(db.users, db.categories);

module.exports = db;