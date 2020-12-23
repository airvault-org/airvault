const environment = require('../config/environment');
const app = require('../lib/infrastructure/app-builder');

module.exports = {
  getTestServer: () => app()
};
