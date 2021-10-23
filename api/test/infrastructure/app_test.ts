import { deepStrictEqual, strictEqual } from 'assert';
import { getTestServer } from '../test-helpers';
import { FastifyInstance, InjectOptions } from 'fastify';

describe('app', () => {

  let testServer: FastifyInstance;

  beforeEach(() => {
    testServer = getTestServer();
  });

  afterEach(() => {
    testServer.close();
  });

  it('should expose route `GET /`', async () => {
    // given
    const routeOptions: InjectOptions = {
      method: 'GET',
      url: '/v1'
    };

    // when
    const response = await testServer.inject(routeOptions);

    // then
    strictEqual(response.statusCode, 200);
    deepStrictEqual(JSON.parse(response.body), {hello: 'world'});
  });
});
