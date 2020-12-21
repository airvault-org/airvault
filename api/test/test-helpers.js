const app = require('../lib/app');

const testServer = app({ logger: false });

module.exports = {
  testServer
};
