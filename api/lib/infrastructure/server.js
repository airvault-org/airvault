const { logger, port } = require('../../config/environment').server;
const server = require('./app-builder')({ logger });

module.exports = {

  server,

  async start() {
    try {
      await server.listen(port);

      // https://www.fastify.io/docs/latest/Server/#printroutes
      server.ready(() => {
        console.log(server.printRoutes());
      });

    } catch (err) {
      server.log.error(err);
      process.exit(1);
    }
  }

};
