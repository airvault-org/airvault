import CryptoJS from 'crypto-js';

class ItemCipherAesCdc256 {

  key: string;

  constructor(key: string) {
    this.key = key;
  }

  encrypt(itemContent: any): string {
    const stringifiedItemContent = JSON.stringify(itemContent);
    return CryptoJS.AES.encrypt(stringifiedItemContent, this.key).toString();
  }

  decrypt(encryptedItemContent: string): any {
    const bytes = CryptoJS.AES.decrypt(encryptedItemContent, this.key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

}

export { ItemCipherAesCdc256 };
