import * as assert from 'assert';
import * as sinon from 'sinon';
import * as useCases from '../../../../lib/application';
import { Item, ItemContent, ItemType } from '../../../../lib/domain/Item';
import { Vault } from '../../../../lib/domain/Vault';
import { VaultSummary } from '../../../../lib/domain/VaultSummary';
import { getTestServer } from '../../../test-helpers';
import { FastifyInstance, InjectOptions } from 'fastify';
import { EntityList } from '../../../../lib/domain/EntityList';

describe('infrastructure/routes/v1/vaults', () => {

  let testServer: FastifyInstance;

  beforeEach(() => {
    testServer = getTestServer();
    testServer.container.register('vaultRepository', {existsByUuidAndAccountId: () => true});
  });

  afterEach(() => {
    testServer.close();
  });

  describe('GET /vaults', async () => {

    it('should be ok', async () => {
      // given
      const vault1 = new VaultSummary({
        id: 1,
        uuid: '3b923f70-17ed-4ac8-9ee6-5b8ff5a23b13',
        name: 'Default vault',
        itemsCount: 27
      });
      const vault2 = new VaultSummary({
        id: 2,
        uuid: '50cb9513-6b10-4dce-a64d-d0778d10958d',
        name: 'Other vault',
        itemsCount: 3
      });
      const vaults = new EntityList<VaultSummary>([vault1, vault2]);
      sinon.stub(useCases, 'listVaults').withArgs({ownerId: 1}, testServer.container).resolves(vaults);
      const routeOptions: InjectOptions = {method: 'GET', path: '/v1/vaults'};

      // when
      const response = await testServer.inject(routeOptions);

      // then
      assert.strictEqual(response.statusCode, 200);
      assert.deepStrictEqual(response.json(), {
        'object': 'list',
        'data': [{
          'object': 'vault_summary',
          'id': '3b923f70-17ed-4ac8-9ee6-5b8ff5a23b13',
          'name': 'Default vault',
          'items_count': 27,
        }, {
          'object': 'vault_summary',
          'id': '50cb9513-6b10-4dce-a64d-d0778d10958d',
          'name': 'Other vault',
          'items_count': 3,
        }]
      });
    });
  });

  describe('POST /vaults', async () => {

    it('should be ok', async () => {
      // given
      const routeOptions: InjectOptions = {
        method: 'POST',
        path: '/v1/vaults',
        payload: {
          name: 'New vault',
        }
      };
      const now = new Date('2020-12-20');
      const createdVault = new Vault({
        id: 1,
        uuid: '3b923f70-17ed-4ac8-9ee6-5b8ff5a23b13',
        name: 'New vault',
        accountUuid: 'f1e37124-d1e1-4c5b-9b4e-fbacb2e56db4',
        createdAt: now,
        updatedAt: now,
      });
      sinon.stub(useCases, 'createVault').resolves(createdVault);

      // when
      const response = await testServer.inject(routeOptions);

      // then
      assert.strictEqual(response.statusCode, 201);
      assert.deepStrictEqual(response.json(), {
        'object': 'vault',
        'id': '3b923f70-17ed-4ac8-9ee6-5b8ff5a23b13',
        'name': 'New vault',
        'created': now.getTime(),
        'updated': now.getTime(),
        'account_id': 'f1e37124-d1e1-4c5b-9b4e-fbacb2e56db4',
      });
    });
  });

  describe('GET /vaults/:uuid', async () => {

    it('should be ok', async () => {
      // given
      const now = new Date();
      const vault = new Vault({
        id: 1,
        uuid: 'f1e37124-d1e1-4c5b-9b4e-fbacb2e56db4',
        name: 'Default vault',
        accountUuid: '50cb9513-6b10-4dce-a64d-d0778d10958d',
        createdAt: now,
        updatedAt: now,
      });
      sinon.stub(useCases, 'getVault').withArgs({
        vaultUuid: 'f1e37124-d1e1-4c5b-9b4e-fbacb2e56db4',
        accountId: 1
      }, testServer.container).resolves(vault);
      const routeOptions: InjectOptions = {method: 'GET', path: '/v1/vaults/f1e37124-d1e1-4c5b-9b4e-fbacb2e56db4'};

      // when
      const response = await testServer.inject(routeOptions);

      // then
      assert.strictEqual(response.statusCode, 200);
      assert.deepStrictEqual(response.json(), {
        'object': 'vault',
        'id': 'f1e37124-d1e1-4c5b-9b4e-fbacb2e56db4',
        'name': 'Default vault',
        'created': now.getTime(),
        'updated': now.getTime(),
        'account_id': '50cb9513-6b10-4dce-a64d-d0778d10958d',
      });
    });
  });

  describe('PATCH /vaults/:uuid', async () => {

    it('should be ok', async () => {
      // given
      const now = new Date();
      const vault = new Vault({
        id: 1,
        uuid: '50cb9513-6b10-4dce-a64d-d0778d10958d',
        name: 'Edited vault',
        createdAt: now,
        updatedAt: now,
        accountUuid: '3b923f70-17ed-4ac8-9ee6-5b8ff5a23b13',
      });
      sinon.stub(useCases, 'updateVault').withArgs({
        uuid: '50cb9513-6b10-4dce-a64d-d0778d10958d',
        name: 'Edited vault'
      }, testServer.container).resolves(vault);
      const routeOptions: InjectOptions = {
        method: 'PATCH',
        path: '/v1/vaults/50cb9513-6b10-4dce-a64d-d0778d10958d',
        payload: {
          name: 'Edited vault',
        }
      };

      // when
      const response = await testServer.inject(routeOptions);

      // then
      assert.strictEqual(response.statusCode, 200);
      assert.deepStrictEqual(response.json(), {
        'object': 'vault',
        'id': '50cb9513-6b10-4dce-a64d-d0778d10958d',
        'name': 'Edited vault',
        'created': now.getTime(),
        'updated': now.getTime(),
        'account_id': '3b923f70-17ed-4ac8-9ee6-5b8ff5a23b13',
      });
    });
  });

  describe('DELETE /vaults/:uuid', async () => {

    it('should be ok', async () => {
      // given
      sinon.stub(useCases, 'deleteVault').resolves(true);
      const routeOptions: InjectOptions = {method: 'DELETE', path: '/v1/vaults/1'};

      // when
      const response = await testServer.inject(routeOptions);

      // then
      assert.strictEqual(response.statusCode, 204);
      assert.deepStrictEqual(response.payload, '');
    });
  });

  describe('GET /vaults/:uuid/items', async () => {

    it('should be ok', async () => {
      // given
      const now = new Date('2020-12-30');
      const item1 = new Item({
        id: 1,
        uuid: 'f1e37124-d1e1-4c5b-9b4e-fbacb2e56db4',
        type: ItemType.LOGIN,
        content: new ItemContent('item_1', 'username_1', 'password_1', 'http://website.1.url'),
        createdAt: now,
        updatedAt: now,
        vaultUuid: '3b923f70-17ed-4ac8-9ee6-5b8ff5a23b13',
      });
      const item2 = new Item({
        id: 2,
        uuid: '50cb9513-6b10-4dce-a64d-d0778d10958d',
        type: ItemType.LOGIN,
        content: new ItemContent('item_2', 'username_2', 'password_2', 'http://website.2.url'),
        createdAt: now,
        updatedAt: now,
        vaultUuid: '3b923f70-17ed-4ac8-9ee6-5b8ff5a23b13',
      });
      const items = new EntityList([item1, item2]);
      sinon.stub(useCases, 'getVaultItems').resolves(items);
      const routeOptions: InjectOptions = {method: 'GET', path: '/v1/vaults/3b923f70-17ed-4ac8-9ee6-5b8ff5a23b13/items'};

      // when
      const response = await testServer.inject(routeOptions);

      // then
      assert.strictEqual(response.statusCode, 200);
      assert.deepStrictEqual(response.json(), {
        'object': 'list',
        'data': [{
          'object': 'item',
          'id': 'f1e37124-d1e1-4c5b-9b4e-fbacb2e56db4',
          'type': 'login',
          'title': 'item_1',
          'username': 'username_1',
          'password': 'password_1',
          'website': 'http://website.1.url',
          'created': now.getTime(),
          'updated': now.getTime(),
          'vault_id': '3b923f70-17ed-4ac8-9ee6-5b8ff5a23b13',
        }, {
          'object': 'item',
          'id': '50cb9513-6b10-4dce-a64d-d0778d10958d',
          'type': 'login',
          'title': 'item_2',
          'username': 'username_2',
          'password': 'password_2',
          'website': 'http://website.2.url',
          'created': now.getTime(),
          'updated': now.getTime(),
          'vault_id': '3b923f70-17ed-4ac8-9ee6-5b8ff5a23b13',
        }]
      });
    });
  });

  describe('POST /vaults/:uuid/items', async () => {

    it('should be ok', async () => {
      // given
      const now = new Date();
      const item = new Item({
        id: 1,
        uuid: 'f1e37124-d1e1-4c5b-9b4e-fbacb2e56db4',
        type: ItemType.LOGIN,
        content: new ItemContent('item_1', 'username_1', 'password_1', 'http://website.1.url'),
        createdAt: now,
        updatedAt: now,
        vaultUuid: '50cb9513-6b10-4dce-a64d-d0778d10958d',
      });
      sinon.stub(useCases, 'createItem').resolves(item);
      const routeOptions: InjectOptions = {method: 'POST', path: '/v1/vaults/50cb9513-6b10-4dce-a64d-d0778d10958d/items'};

      // when
      const response = await testServer.inject(routeOptions);

      // then
      assert.strictEqual(response.statusCode, 201);
      assert.deepStrictEqual(response.json(), {
        'object': 'item',
        'id': 'f1e37124-d1e1-4c5b-9b4e-fbacb2e56db4',
        'type': 'login',
        'title': 'item_1',
        'username': 'username_1',
        'password': 'password_1',
        'website': 'http://website.1.url',
        'created': now.getTime(),
        'updated': now.getTime(),
        'vault_id': '50cb9513-6b10-4dce-a64d-d0778d10958d',
      });
    });
  });

});
