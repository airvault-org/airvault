const authenticator = require('../security/oauth/authenticator');

module.exports = [{
  method: 'POST',
  url: '/token',
  handler: async function(request, reply) {
    try {
      await authenticator.token(request, reply);
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  },
}];
