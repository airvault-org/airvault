const CryptoJS = require('crypto-js');
const expect = require('chai').expect;
const sinon = require("sinon");
const ItemCipherAESGCM256 = require('../../../lib/infrastructure/ciphers/ItemCipherAESGCM256');
const Item = require('../../../lib/domain/Item');
const ItemType = require('../../../lib/domain/ItemType');

describe('infrastructure/ciphers/ItemCipherAESGCM256', () => {

  const itemCipher = new ItemCipherAESGCM256('some_cipher_key');

  const date = new Date('2020-30-12');
  const item = new Item({
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

  afterEach(() => {
    sinon.restore();
  });

  describe('#encrypt', () => {

    it('should return an encrypted string of tan Item content', () => {
      // given
      sinon.stub(CryptoJS.AES, 'encrypt').returns('EncryptedMessage==');

      // when
      const encryptedItemContent = itemCipher.encrypt(item.content);

      // then
      expect(encryptedItemContent).to.equal('EncryptedMessage==');
    });
  });

  describe('#decrypt', () => {

    it('should apply reverse encryption to a given encrypted item content', () => {
      // given
      const encryptedItemContent = itemCipher.encrypt(item.content);

      // when
      const result = itemCipher.decrypt(encryptedItemContent);

      // then
      expect(result).to.deep.equal(item.content);
    });
  });
});
