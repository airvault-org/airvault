class Vault {

  id;
  name;
  createdAt;
  updatedAt;
  items;

  constructor(attributes = {}) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.createdAt = attributes.createdAt || new Date();
    this.updatedAt = attributes.updatedAt || new Date();
    this.items = attributes.items || [];
  }

}

module.exports = Vault;


