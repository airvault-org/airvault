const assert = require('assert');
const { getTestServer } = require('../test-helpers');

describe('app', () => {

  let testServer;

  beforeEach(() => {
    testServer = getTestServer();
  });

  afterEach(() => {
    testServer.close();
  });

  it('should expose route `GET /`', async () => {
    // given
    const routeOptions = {
      method: 'GET',
      url: '/v1'
    };

    // when
    const response = await testServer.inject(routeOptions);

    // then
    assert.equal(response.statusCode, 200);
    assert.deepStrictEqual(JSON.parse(response.body), { hello: 'world' });
  });
});
