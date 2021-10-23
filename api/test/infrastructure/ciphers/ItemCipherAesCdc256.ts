import * as CryptoJS from 'crypto-js';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { ItemCipherAesCdc256 } from '../../../lib/infrastructure/ciphers/ItemCipherAesCdc256';
import { Item, ItemContent, ItemType } from '../../../lib/domain/Item';

describe('infrastructure/ciphers/ItemCipherAesCdc256', () => {

  const itemCipher = new ItemCipherAesCdc256('placeholder_key');

  const date = new Date('2020-30-12');
  const item = new Item({
    id: 1,
    type: ItemType.LOGIN,
    content: new ItemContent('title', 'username', 'password', 'http://web.site.url',),
    createdAt: date,
    updatedAt: date,
    vaultUuid: '1',
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('#encrypt', () => {

    it('should return an encrypted string of tan Item content', () => {
      // given
      // @ts-ignore
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
