const bcrypt = require('bcrypt');
const Encryption = require('./Encryption');

class BcryptEncryption extends Encryption {

  #saltRounds = 10;

  async encrypt(clearText) {
    return bcrypt.hash(clearText, this.#saltRounds);
  }

  async compare(clearText, encryptedText) {
    return bcrypt.compare(clearText, encryptedText);
  }
}

module.exports = BcryptEncryption;
