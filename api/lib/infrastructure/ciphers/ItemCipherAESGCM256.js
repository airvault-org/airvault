const CryptoJS = require('crypto-js');
const ItemCipher = require('../../domain/ItemCipher');

class ItemCipherAESGCM256 extends ItemCipher {

  key = null;

  constructor(key) {
    super();
    this.key = key;
  }

  encrypt(itemContent) {
    const stringifiedItemContent = JSON.stringify(itemContent);
    return CryptoJS.AES.encrypt(stringifiedItemContent, this.key).toString();
  }

  decrypt(encryptedItemContent) {
    const bytes  = CryptoJS.AES.decrypt(encryptedItemContent, this.key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

}

module.exports = ItemCipherAESGCM256;
