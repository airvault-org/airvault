const assert = require('assert');
const { testServer } = require('./../test-helpers');

describe('app', () => {

  beforeEach(() => {
    return testServer.listen();
  });

  afterEach(() => {
    return testServer.close();
  });

  it('should expose route `GET /`', async () => {
    // given
    const routeOptions = {
      method: 'GET',
      url: '/api/v1'
    };

    // when
    const response = await testServer.inject(routeOptions);

    // then
    assert.equal(response.statusCode, 200);
    assert.deepStrictEqual(JSON.parse(response.body), { hello: 'world' });
  });
});
