import bcrypt from 'bcrypt';
import {Encryption} from './Encryption';

class BcryptEncryption implements Encryption {

  #saltRounds = 10;

  async encrypt(clearText: string) {
    return bcrypt.hash(clearText, this.#saltRounds);
  }

  async compare(clearText: string, encryptedText: string) {
    return bcrypt.compare(clearText, encryptedText);
  }
}

export {BcryptEncryption};
