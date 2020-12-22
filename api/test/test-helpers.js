const environment = require('../config/environment');

const app = require('../lib/infrastructure/app-builder');

const testServer = app({ logger: environment.server.logger });

module.exports = {
  testServer
};
