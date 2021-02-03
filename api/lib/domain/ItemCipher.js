class ItemCipher {

  encrypt(/* itemContent:ItemContent */) {
    console.log('Returns a String');
    throw new Error('You must implement this method');
  }

  decrypt(/* encryptedItemContent:String */) {
    console.log('Returns a JSON object with decrypted item content');
    throw new Error('You must implement this method');
  }

}

module.exports = ItemCipher;
