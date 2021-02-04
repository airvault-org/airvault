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
        uuid: 'f1e37124-d1e1-4c5b-9b4e-fbacb2e56db4',
        type: ItemType.LOGIN,
        title: 'title',
        username: 'username',
        password: 'password',
        website: 'http://web.site.url',
        createdAt: date,
        updatedAt: date,
        vaultUuid: '50cb9513-6b10-4dce-a64d-d0778d10958d',
      });
      const expected = {
        "object": "item",
        "id": "f1e37124-d1e1-4c5b-9b4e-fbacb2e56db4",
        "type": "login",
        "title": "title",
        "username": "username",
        "password": "password",
        "website": "http://web.site.url",
        "created": date.getTime(),
        "updated": date.getTime(),
        "vault_id": "50cb9513-6b10-4dce-a64d-d0778d10958d",
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
        uuid: '3b923f70-17ed-4ac8-9ee6-5b8ff5a23b13',
        type: ItemType.LOGIN,
        title: 'title_1',
        username: 'username_1',
        password: 'password_1',
        website: 'http://1.web.site.url',
        createdAt: date,
        updatedAt: date,
        vaultUuid: '50cb9513-6b10-4dce-a64d-d0778d10958d',
      });
      const item2 = new Item({
        id: 2,
        uuid: 'f1e37124-d1e1-4c5b-9b4e-fbacb2e56db4',
        type: ItemType.LOGIN,
        title: 'title_2',
        username: 'username_2',
        password: 'password_2',
        website: 'http://2.web.site.url',
        createdAt: date,
        updatedAt: date,
        vaultUuid: '50cb9513-6b10-4dce-a64d-d0778d10958d',
      });
      const data = [item1, item2];
      const expected = {
        "object": "list",
        "data": [{
          "object": "item",
          "id": "3b923f70-17ed-4ac8-9ee6-5b8ff5a23b13",
          "type": "login",
          "title": "title_1",
          "username": "username_1",
          "password": "password_1",
          "website": "http://1.web.site.url",
          "created": date.getTime(),
          "updated": date.getTime(),
          "vault_id": "50cb9513-6b10-4dce-a64d-d0778d10958d",
        }, {
          "object": "item",
          "id": "f1e37124-d1e1-4c5b-9b4e-fbacb2e56db4",
          "type": "login",
          "title": "title_2",
          "username": "username_2",
          "password": "password_2",
          "website": "http://2.web.site.url",
          "created": date.getTime(),
          "updated": date.getTime(),
          "vault_id": "50cb9513-6b10-4dce-a64d-d0778d10958d",
        }]
      };

      // when
      const serialized = itemSerializer.serialize(data);

      // then
      assert.deepStrictEqual(serialized, expected);
    });
  });

});
