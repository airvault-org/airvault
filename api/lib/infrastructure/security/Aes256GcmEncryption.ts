import crypto from 'crypto';

class Aes256GcmEncryption {

  async encrypt(clearData: string, masterKey: string) {
    let clearText = JSON.stringify(clearData);

    // random initialization vector
    const iv = crypto.randomBytes(16);

    // random salt
    const salt = crypto.randomBytes(64);

    // derive encryption key: 32 byte key length
    // in assumption the masterKey is a cryptographic and NOT a password there is no need for
    // a large number of iterations. It may can replaced by HKDF
    // the value of 2145 is randomly chosen!
    const key = crypto.pbkdf2Sync(masterKey, salt, 128, 32, 'sha512');

    // AES 256 GCM Mode
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

    // encrypt the given text
    const encrypted = Buffer.concat([cipher.update(clearText, 'utf8'), cipher.final()]);

    // extract the auth tag
    const tag = cipher.getAuthTag();

    // generate output
    return Buffer.concat([salt, iv, tag, encrypted]).toString('base64');
  }

  // decrypt decodes base64-encoded ciphertext into a utf8-encoded string
  async decrypt(encryptedData: string, masterKey: string) {
    // base64 decoding
    const bData = Buffer.from(encryptedData, 'base64');

    // convert data to buffers
    const salt = bData.slice(0, 64);
    const iv = bData.slice(64, 80);
    const tag = bData.slice(80, 96);
    const text = bData.slice(96);

    // derive key using; 32 byte key length
    const key = crypto.pbkdf2Sync(masterKey, salt, 128, 32, 'sha512');

    // AES 256 GCM Mode
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);

    // encrypt the given text
    const decrypted = decipher.update(text.toString(), 'binary', 'utf8') + decipher.final('utf8');

    return JSON.parse(decrypted);
  }

}

export {Aes256GcmEncryption};
