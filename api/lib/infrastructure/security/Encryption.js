class Encryption {

  async encrypt(clearText) {
    console.log('Returns the clear text encrypted');
    throw new Error('You must implement this method');
  }

  async compare(clearText, encryptedText) {
    console.log('Returns a boolean');
    throw new Error('You must implement this method');
  }
}

module.exports = Encryption;
