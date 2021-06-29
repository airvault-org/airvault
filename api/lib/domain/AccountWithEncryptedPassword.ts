import {Account} from './Account';

class AccountWithEncryptedPassword extends Account {

  encryptedPassword?: string;

  constructor(attributes: { id?: number, uuid?: string, name: string, username: string, email: string, encryptedPassword?: string, createdAt: Date, updatedAt: Date }) {
    super(attributes);
    this.encryptedPassword = attributes.encryptedPassword;
  }

}

export {AccountWithEncryptedPassword};
