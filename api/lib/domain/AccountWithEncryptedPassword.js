const Account = require('./Account');

class AccountWithEncryptedPassword extends Account {

  encryptedPassword;

  constructor(attributes = {}) {
    super(attributes);
    this.encryptedPassword = attributes.encryptedPassword;
  }

}

module.exports = AccountWithEncryptedPassword;


