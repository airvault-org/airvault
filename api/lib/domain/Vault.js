class Vault {

  id;
  uuid;
  name;
  createdAt;
  updatedAt;
  items;
  accountId;

  constructor(attributes = {}) {
    this.id = attributes.id;
    this.uuid = attributes.uuid;
    this.name = attributes.name;
    this.createdAt = attributes.createdAt || new Date();
    this.updatedAt = attributes.updatedAt || new Date();
    this.items = attributes.items || [];
    this.accountId = attributes.accountId;
  }

}

module.exports = Vault;


