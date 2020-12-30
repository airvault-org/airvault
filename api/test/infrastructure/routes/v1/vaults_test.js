const assert = require('assert');
const sinon = require('sinon');
const useCases = require('../../../../lib/application');
const Item = require('../../../../lib/domain/Item');
const ItemList = require('../../../../lib/domain/ItemList');
const Vault = require('../../../../lib/domain/Vault');
const VaultSummary = require('../../../../lib/domain/VaultSummary');
const { getTestServer } = require('../../../test-helpers');

describe('infrastructure/routes/v1/vaults', () => {

  let testServer;

  beforeEach(() => {
    testServer = getTestServer();
    testServer.container.register('vaultRepository', { existsByIdAndAccountId: () => true });
  });

  afterEach(() => {
    testServer.close();
  });

  describe('GET /vaults', async () => {

    it('should be ok', async () => {
      // given
      const vault1 = new VaultSummary({ id: 1, name: 'Default vault', itemsCount: 27 });
      const vault2 = new VaultSummary({ id: 2, name: 'Other vault', itemsCount: 3 });
      const vaults = [vault1, vault2];
      sinon.stub(useCases, 'listVaults').withArgs({ ownerId: 1 }).resolves(vaults);
      const routeOptions = { method: 'GET', path: '/v1/vaults' };

      // when
      const response = await testServer.inject(routeOptions);

      // then
      assert.strictEqual(response.statusCode, 200);
      assert.deepStrictEqual(response.json(), {
        "object": "list",
        "data": [{
          "object": "vault_summary",
          "id": "1",
          "name": "Default vault",
          "items_count": 27,
        }, {
          "object": "vault_summary",
          "id": "2",
          "name": "Other vault",
          "items_count": 3,
        }]
      });
    });
  });

  describe('POST /vaults', async () => {

    it('should be ok', async () => {
      // given
      const routeOptions = {
        method: 'POST',
        path: '/v1/vaults',
        body: {
          name: 'New vault',
        }
      };
      const now = new Date('2020-12-20');
      const createdVault = new Vault({
        id: 1,
        name: 'New vault',
        accountId: 1,
        createdAt: now,
        updatedAt: now,
      });
      sinon.stub(useCases, 'createVault').resolves(createdVault);

      // when
      const response = await testServer.inject(routeOptions);

      // then
      assert.strictEqual(response.statusCode, 201);
      assert.deepStrictEqual(response.json(), {
        "object": "vault",
        "id": "1",
        "name": "New vault",
        "created": now.getTime(),
        "updated": now.getTime(),
        "account_id": "1",
      });
    });
  });

  describe('GET /vaults/:id', async () => {

    it('should be ok', async () => {
      // given
      const now = new Date();
      const vault = new Vault({
        id: 1,
        name: 'Default vault',
        accountId: 1,
        createdAt: now,
        updatedAt: now,
      });
      sinon.stub(useCases, 'getVault').withArgs({ id: 1, accountId: 1 }).resolves(vault);
      const routeOptions = { method: 'GET', path: '/v1/vaults/1' };

      // when
      const response = await testServer.inject(routeOptions);

      // then
      assert.strictEqual(response.statusCode, 200);
      assert.deepStrictEqual(response.json(), {
        "object": "vault",
        "id": "1",
        "name": "Default vault",
        "created": now.getTime(),
        "updated": now.getTime(),
        "account_id": "1",
      });
    });
  });

  describe('PATCH /vaults/:id', async () => {

    it('should be ok', async () => {
      // given
      const now = new Date();
      const vault = new Vault({
        id: 1,
        name: 'Edited vault',
        createdAt: now,
        updatedAt: now,
        accountId: 1,
      });
      sinon.stub(useCases, 'updateVault').withArgs({ id: 1, name: 'Edited vault' }).resolves(vault);
      const routeOptions = {
        method: 'PATCH',
        path: '/v1/vaults/1',
        body: {
          name: 'Edited vault',
        }
      };

      // when
      const response = await testServer.inject(routeOptions);

      // then
      assert.strictEqual(response.statusCode, 200);
      assert.deepStrictEqual(response.json(), {
        "object": "vault",
        "id": "1",
        "name": "Edited vault",
        "created": now.getTime(),
        "updated": now.getTime(),
        "account_id": "1",
      });
    });
  });

  describe('DELETE /vaults/:id', async () => {

    it('should be ok', async () => {
      // given
      sinon.stub(useCases, 'deleteVault').resolves(true);
      const routeOptions = { method: 'DELETE', path: '/v1/vaults/1' };

      // when
      const response = await testServer.inject(routeOptions);

      // then
      assert.strictEqual(response.statusCode, 204);
      assert.deepStrictEqual(response.payload, '');
    });
  });

  describe('GET /vaults/:id/items', async () => {

    it('should be ok', async () => {
      // given
      const now = new Date('2020-12-30');
      const item1 = new Item({
        id: 1,
        username: 'item_1',
        password: 'password_1',
        website: 'http://website.1.url',
        createdAt: now,
        updatedAt: now,
        vaultId: 1,
      });
      const item2 = new Item({
        id: 2,
        username: 'item_2',
        password: 'password_2',
        website: 'http://website.2.url',
        createdAt: now,
        updatedAt: now,
        vaultId: 1,
      });
      const itemList = new ItemList([item1, item2]);
      sinon.stub(useCases, 'getVaultItems').resolves(itemList);
      const routeOptions = { method: 'GET', path: '/v1/vaults/1/items' };

      // when
      const response = await testServer.inject(routeOptions);

      // then
      assert.strictEqual(response.statusCode, 200);
      assert.deepStrictEqual(response.json(), {
        "object": "list",
        "data": [{
          "object": "item",
          "id": "1",
          "username": "item_1",
          "password": "password_1",
          "website": "http://website.1.url",
          "created": now.getTime(),
          "updated": now.getTime(),
          "vault_id": "1",
        }, {
          "object": "item",
          "id": "2",
          "username": "item_2",
          "password": "password_2",
          "website": "http://website.2.url",
          "created": now.getTime(),
          "updated": now.getTime(),
          "vault_id": "1",
        }]
      });
    });
  });

  describe('POST /vaults/:id/items', async () => {

    it('should be ok', async () => {
      // given
      const now = new Date();
      const item = new Item({
        id: 1,
        username: 'item_1',
        password: 'password_1',
        website: 'http://website.1.url',
        createdAt: now,
        updatedAt: now,
        vaultId: 1,
      });
      sinon.stub(useCases, 'createItem').resolves(item);
      const routeOptions = { method: 'POST', path: '/v1/vaults/1/items' };

      // when
      const response = await testServer.inject(routeOptions);

      // then
      assert.strictEqual(response.statusCode, 201);
      assert.deepStrictEqual(response.json(), {
        "object": "item",
        "id": "1",
        "username": "item_1",
        "password": "password_1",
        "website": "http://website.1.url",
        "created": now.getTime(),
        "updated": now.getTime(),
        "vault_id": "1",
      });
    });
  });

});
