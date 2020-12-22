module.exports = {

  async start() {
    const { logger, port } = require('../../environment').server;
    const server = require('./app')({ logger });
    try {
      await server.listen(port);
    } catch (err) {
      server.log.error(err);
      process.exit(1);
    }
  }

};
