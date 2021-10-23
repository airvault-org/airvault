import * as assert from 'assert';
import vaultSerializer from '../../../lib/infrastructure/serializers/vault-serializer';
import { Vault } from '../../../lib/domain/Vault';
import { VaultSummary } from "../../../lib/domain/VaultSummary";

describe('infrastructure/serializers/vault-serializer', () => {

  it('should throw an error when data is `undefined` or `null`', () => {
    try {
      // given
      const data = null;

      // when
      vaultSerializer.serialize(data);

    } catch (err) {
      // then
      assert.strictEqual(err.message, 'Serialization error');
    }
  });

  describe('#serialize a VaultSummary', async () => {

    it('should return a JSON object', () => {
      // given
      const data = new VaultSummary({
        id: 1,
        uuid: '3b923f70-17ed-4ac8-9ee6-5b8ff5a23b13',
        name: 'My vault',
        itemsCount: 4,
      });
      const expected = {
        "object": "vault_summary",
        "id": "3b923f70-17ed-4ac8-9ee6-5b8ff5a23b13",
        "name": "My vault",
        "items_count": 4,
      };

      // when
      const serialized = vaultSerializer.serialize(data);

      // then
      assert.deepStrictEqual(serialized, expected);
    });
  });

  describe('#serialize a Vault', async () => {

    it('should return a JSON object', () => {
      // given
      const now = new Date('2020-12-30');
      const data = new Vault({
        id: 1,
        uuid: '3b923f70-17ed-4ac8-9ee6-5b8ff5a23b13',
        name: 'Default',
        createdAt: now,
        updatedAt: now,
        accountUuid: 'f1e37124-d1e1-4c5b-9b4e-fbacb2e56db4',
      });
      const expected = {
        "object": "vault",
        "id": "3b923f70-17ed-4ac8-9ee6-5b8ff5a23b13",
        "name": "Default",
        "created": now.getTime(),
        "updated": now.getTime(),
        "account_id": "f1e37124-d1e1-4c5b-9b4e-fbacb2e56db4",
      };

      // when
      const serialized = vaultSerializer.serialize(data);

      // then
      assert.deepStrictEqual(serialized, expected);
    });
  });

  describe('#serialize a list of VaultSummary', async () => {

    it('should return a list of JSON objects', () => {
      // given
      const vaultSummary1 = new VaultSummary({
        id: 1,
        uuid: '3b923f70-17ed-4ac8-9ee6-5b8ff5a23b13',
        name: 'Default',
        itemsCount: 4,
      });
      const vaultSummary2 = new VaultSummary({
        id: 2,
        uuid: '50cb9513-6b10-4dce-a64d-d0778d10958d',
        name: 'Shared',
        itemsCount: 0,
      })
      const data = [vaultSummary1, vaultSummary2];
      const expected = {
        "object": "list",
        "data": [{
          "object": "vault_summary",
          "id": "3b923f70-17ed-4ac8-9ee6-5b8ff5a23b13",
          "name": "Default",
          "items_count": 4,
        }, {
          "object": "vault_summary",
          "id": "50cb9513-6b10-4dce-a64d-d0778d10958d",
          "name": "Shared",
          "items_count": 0,
        }]
      };

      // when
      const serialized = vaultSerializer.serialize(data);

      // then
      assert.deepStrictEqual(serialized, expected);
    });
  });

});
