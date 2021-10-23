import { expect } from 'chai';
import { Aes256GcmEncryption } from '../../../lib/infrastructure/security/Aes256GcmEncryption';

describe.skip('Aes256GcmEncryption', () => {

  describe('#decrypt', () => {

    it('should ', async () => {
      // given
      const clearData = {foo: 'bar'};
      const masterKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInByZWZlcnJlZF91c2VybmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBleGFtcGxlLm5ldCIsImlhdCI6MTYxMjgyMjEwNSwiZXhwIjoxNjEyODI1NzA1fQ.zm5QGpR-RDOYVtwf54L48-o4s4R_p2XIAEUZZ9vqL6I';
      const encryption = new Aes256GcmEncryption();
      const encrypted = await encryption.encrypt(clearData, masterKey);

      // when
      const decrypted = await encryption.decrypt(encrypted, masterKey);

      // then
      expect(decrypted).to.deep.equal(clearData);
    });
  });

});
