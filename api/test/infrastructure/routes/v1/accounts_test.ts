import * as assert from 'assert';
import * as sinon from 'sinon';
import * as useCases from '../../../../lib/application';
import { FastifyInstance, InjectOptions } from 'fastify';
import { Account } from '../../../../lib/domain/Account';
import { getTestServer } from '../../../test-helpers';

describe('infrastructure/routes/v1/accounts', () => {

  let testServer: FastifyInstance;

  beforeEach(() => {
    testServer = getTestServer();
  });

  afterEach(() => {
    testServer.close();
  });

  describe('POST /accounts', async () => {

    it('should be ok', async () => {
      // given
      const routeOptions: InjectOptions = {
        method: 'POST',
        path: '/v1/accounts',
        payload: {
          username: 'jdoe',
          password: 'P@s$w0rD',
          email: 'jdoe@example.net'
        }
      };
      const createdAccount = new Account({
        id: 1,
        name: 'J. Doe',
        username: 'jdoe',
        email: 'jdoe@example.net',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      sinon.stub(useCases, 'createAccount').resolves(createdAccount);

      // when
      const response = await testServer.inject(routeOptions);

      // then
      assert.strictEqual(response.statusCode, 201);
      assert.deepStrictEqual(response.payload, JSON.stringify(createdAccount));
    });
  });
});
