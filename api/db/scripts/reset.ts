import { Sequelize } from 'sequelize';
import { environment } from '../../config/environment';
import { DatabaseConfig, getDatabase } from '../../config/database.js';

const config: DatabaseConfig = getDatabase(environment.name);

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
