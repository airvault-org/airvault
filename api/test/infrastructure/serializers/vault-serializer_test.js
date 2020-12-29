const assert = require('assert');
const vaultSerializer = require('../../../lib/infrastructure/serializers/vault-serializer');
const VaultSummary = require('../../../lib/domain/VaultSummary');

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
        name: 'My vault',
        itemsCount: 4,
      });
      const expected = {
        "object": "vault_summary",
        "id": "1",
        "name": "My vault",
        "items_count": 4,
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
        name: 'Default',
        itemsCount: 4,
      });
      const vaultSummary2 = new VaultSummary({
        id: 2,
        name: 'Shared',
        itemsCount: 0,
      })
      const data = [vaultSummary1, vaultSummary2];
      const expected = {
        "object": "list",
        "data": [{
          "object": "vault_summary",
          "id": "1",
          "name": "Default",
          "items_count": 4,
        }, {
          "object": "vault_summary",
          "id": "2",
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
