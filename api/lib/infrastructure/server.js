const { logger, port } = require('../../config/environment').server;
const server = require('./app-builder')({ logger });

module.exports = {

  server,

  async start() {
    try {
      await server.listen(port);
    } catch (err) {
      server.log.error(err);
      process.exit(1);
    }
  }

};
