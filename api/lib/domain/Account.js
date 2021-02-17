class Account {

  id;
  uuid;
  name;
  username;
  email;
  createdAt;
  updatedAt;

  constructor(attributes = {}) {
    this.id = attributes.id;
    this.uuid = attributes.uuid;
    this.name = attributes.name;
    this.username = attributes.username;
    this.email = attributes.email;
    this.createdAt = attributes.createdAt;
    this.updatedAt = attributes.updatedAt;
  }

}

module.exports = Account;


