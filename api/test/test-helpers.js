const environment = require('../environment');

const app = require('../lib/app');

const testServer = app({ logger: environment.server.logger });

module.exports = {
  testServer
};
