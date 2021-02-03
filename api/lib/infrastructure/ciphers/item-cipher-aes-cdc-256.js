const CryptoJS = require('crypto-js');
const environment = require('../../../config/environment');

class ItemCipherAesCdc256 {

  key = null;

  constructor(key) {
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

module.exports = new ItemCipherAesCdc256(environment.items.cipher.key);
