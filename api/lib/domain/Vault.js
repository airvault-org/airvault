class Vault {

  id;
  name;
  createdAt;
  updatedAt;

  constructor(attributes = {}) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.createdAt = attributes.createdAt;
    this.updatedAt = attributes.updatedAt;
  }

}

module.exports = Vault;


