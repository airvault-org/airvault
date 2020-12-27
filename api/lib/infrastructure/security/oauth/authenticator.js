const OAuth2Server = require('oauth2-server');
const { Request, Response } = OAuth2Server;

const oauth = new OAuth2Server({
  model: require('./model')
});

async function token(request, reply) {
  const oauthRequest = new Request(request);
  const oauthResponse = new Response();
  const oauthOptions = {
    requireClientAuthentication: {
      password: false,
      refresh_token: false,
    }
  };
  await oauth.token(oauthRequest, oauthResponse, oauthOptions);
  reply
    .code(oauthResponse.status)
    .headers(oauthResponse.headers)
    .send(oauthResponse.body);
}

async function authenticate(request, reply) {
  const oauthRequest = new Request(request);
  const oauthResponse = new Response();
  const oauthOptions = {};
  const oauthToken = await oauth.authenticate(oauthRequest, oauthResponse, oauthOptions);
  request.user = oauthToken.user;
  return oauthToken;
}

module.exports = {

  token,
  authenticate,

}
