const { Sequelize } = require('sequelize');
const environment = require('../../config/environment');
const config = require('../../config/database.js')[environment.name];

async function drop() {
  console.log(environment.name);
  console.log(environment.db.url);
  const sequelize = new Sequelize(environment.db.url, config);
  await sequelize.getQueryInterface().dropAllTables();
}

drop();
