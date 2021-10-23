import environment from './environment';

export default {
  "development": {
    "url": environment.db.url,
    "dialect": "postgres"
  },
  "test": {
    "url": environment.db.url,
    "dialect": "postgres"
  },
  "production": {
    "url": environment.db.url,
    "dialect": "postgres"
  }
};

