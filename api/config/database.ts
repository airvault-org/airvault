import { environment } from './environment';
import { Dialect } from 'sequelize';

type DatabaseConfig = {
  url?: string,
  dialect: Dialect,
}

type Databases = {
  development: DatabaseConfig,
  test: DatabaseConfig,
  production: DatabaseConfig,
}

const development: DatabaseConfig = {
  url: environment.db.url,
  dialect: 'postgres'
}
const test: DatabaseConfig = {
  url: environment.db.url,
  dialect: 'postgres'
}
const production: DatabaseConfig = {
  url: environment.db.url,
  dialect: 'postgres'
}

let databases: Databases = {
  development,
  test,
  production,
}

function getDatabase(environmentName: string): DatabaseConfig {
  return databases[environmentName as keyof Databases];
}

export {
  DatabaseConfig,
  Databases,
  getDatabase,
  development,
  test,
  production,
}
