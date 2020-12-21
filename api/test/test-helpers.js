const config = require('../config');

const app = require('../lib/app');

const testServer = app({ logger: config.server.logger });

module.exports = {
  testServer
};
