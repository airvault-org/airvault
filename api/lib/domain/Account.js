class Account {

  id;
  username;
  password;
  email;
  createdAt;
  updatedAt;

  constructor(attributes = {}) {
    this.id = attributes.id;
    this.username = attributes.username;
    this.password = attributes.password;
    this.email = attributes.email;
    this.createdAt = attributes.createdAt;
    this.updatedAt = attributes.updatedAt;
  }

}

module.exports = Account;


