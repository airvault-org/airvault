import { Sequelize } from 'sequelize';
import { environment } from '../../config/environment';
import * as database from '../../config/database.js';

const config: database.DatabaseConfig = database[environment.name as keyof database.Databases];

async function drop() {
  let sequelize: Sequelize;
  if (config.url != null) {
    sequelize = new Sequelize(config.url, config);
    await sequelize.getQueryInterface().dropAllTables();
  } else {
    throw new Error('Missing database URL');
  }
}

drop();
