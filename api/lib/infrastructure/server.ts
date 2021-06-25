const { logger, port, host } = require('../../config/environment').server;

const  { container } = require('./ioc');

const server = require('./app')({ logger, container });

module.exports = {

  server,

  async start() {
    try {
      await server.listen(port, host);

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
