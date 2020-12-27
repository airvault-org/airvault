const iocContainer = require('../lib/infrastructure/ioc');
const app = require('../lib/infrastructure/app');

module.exports = {
  getTestServer: () => app()
};
