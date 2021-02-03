const assert = require('assert');
const itemSerializer = require('../../../lib/infrastructure/serializers/item-serializer');
const Item = require('../../../lib/domain/Item');
const ItemType = require('../../../lib/domain/ItemType');

describe('infrastructure/serializers/item-serializer', () => {

  it('should throw an error when data is `undefined` or `null`', () => {
    try {
      // given
      const data = null;

      // when
      itemSerializer.serialize(data);

    } catch (err) {
      // then
      assert.strictEqual(err.message, 'Serialization error');
    }
  });

  describe('#serialize an Item', async () => {

    it('should return a JSON object', () => {
      // given
      const date = new Date('2020-30-12');
      const data = new Item({
        id: 1,
        type: ItemType.LOGIN,
        title: 'title',
        username: 'username',
        password: 'password',
        website: 'http://web.site.url',
        createdAt: date,
        updatedAt: date,
        vaultId: 1,
      });
      const expected = {
        "object": "item",
        "id": "1",
        "type": "login",
        "title": "title",
        "username": "username",
        "password": "password",
        "website": "http://web.site.url",
        "created": date.getTime(),
        "updated": date.getTime(),
        "vault_id": "1",
      };

      // when
      const serialized = itemSerializer.serialize(data);

      // then
      assert.deepStrictEqual(serialized, expected);
    });
  });

  describe('#serialize a list of Items', async () => {

    it('should return a list of JSON objects', () => {
      // given
      const date = new Date('2020-30-12');
      const item1 = new Item({
        id: 1,
        type: ItemType.LOGIN,
        title: 'title_1',
        username: 'username_1',
        password: 'password_1',
        website: 'http://1.web.site.url',
        createdAt: date,
        updatedAt: date,
        vaultId: 1,
      });
      const item2 = new Item({
        id: 2,
        type: ItemType.LOGIN,
        title: 'title_2',
        username: 'username_2',
        password: 'password_2',
        website: 'http://2.web.site.url',
        createdAt: date,
        updatedAt: date,
        vaultId: 2,
      });
      const data = [item1, item2];
      const expected = {
        "object": "list",
        "data": [{
          "object": "item",
          "id": "1",
          "type": "login",
          "title": "title_1",
          "username": "username_1",
          "password": "password_1",
          "website": "http://1.web.site.url",
          "created": date.getTime(),
          "updated": date.getTime(),
          "vault_id": "1",
        }, {
          "object": "item",
          "id": "2",
          "type": "login",
          "title": "title_2",
          "username": "username_2",
          "password": "password_2",
          "website": "http://2.web.site.url",
          "created": date.getTime(),
          "updated": date.getTime(),
          "vault_id": "2",
        }]
      };

      // when
      const serialized = itemSerializer.serialize(data);

      // then
      assert.deepStrictEqual(serialized, expected);
    });
  });

});
