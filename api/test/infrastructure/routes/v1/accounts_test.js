const assert = require('assert');
const sinon = require('sinon');
const useCases = require('../../../../lib/application');
const Account = require('../../../../lib/domain/Account');
const { getTestServer } = require('../../../test-helpers');

describe('infrastructure/routes/v1/accounts', () => {

  let testServer;

  beforeEach(() => {
    testServer = getTestServer();
  });

  afterEach(() => {
    testServer.close();
  });

  describe('POST /accounts', async () => {

    it('should be ok', async () => {
      // given
      const routeOptions = {
        method: 'POST',
        path: '/v1/accounts',
        body: {
          username: 'jdoe',
          password: 'P@s$w0rD',
          email: 'jdoe@example.net'
        }
      };
      const createdAccount = new Account({
        id: 1,
        username: 'jdoe',
        password: 'P@s$w0rD',
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
