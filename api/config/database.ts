import { environment } from './environment';
import { Dialect } from 'sequelize';

export type DatabaseConfig = {
  url?: string,
  dialect: Dialect,
}

export type Databases = {
  development: DatabaseConfig,
  test: DatabaseConfig,
  production: DatabaseConfig,
}

let databases: Databases = {
  development: {
    url: environment.db.url,
    dialect: 'postgres'
  },
  test: {
    url: environment.db.url,
    dialect: 'postgres'
  },
  production: {
    url: environment.db.url,
    dialect: 'postgres'
  }
};

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

export {
  development,
  test,
  production
}
