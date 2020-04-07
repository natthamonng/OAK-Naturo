require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.PG_USER,
    "password": process.env.PG_PASSWORD,
    "database": process.env.PG_DATABASE,
    "host": process.env.PG_HOST,
    "port": process.env.PG_PORT,
    "dialect": "mariadb",
    "operatorsAliases": 0,
    "dialectOptions": {
      "timezone": "Etc/GMT0"
    }
  },
  "test": {
    "username": process.env.PG_USER,
    "password": process.env.PG_PASSWORD,
    "database": process.env.PG_DATABASE,
    "host": process.env.PG_HOST,
    "port": process.env.PG_PORT,
    "dialect": "mariadb",
    "operatorsAliases": 0,
    "dialectOptions": {
      "timezone": "Etc/GMT0"
    }
  },
  "production": {
    "username": process.env.PG_USER,
    "password": process.env.PG_PASSWORD,
    "database": process.env.PG_DATABASE,
    "host": process.env.PG_HOST,
    "port": process.env.PG_PORT,
    "dialect": "mariadb",
    "operatorsAliases": 0,
    "dialectOptions": {
      "timezone": "Etc/GMT0"
    }
  }
}

