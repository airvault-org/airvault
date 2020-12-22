class Item {

  id;
  username;
  password;
  website;
  createdAt;
  updatedAt;

  constructor(attributes = {}) {
    this.id = attributes.id;
    this.username = attributes.username;
    this.password = attributes.password;
    this.website = attributes.website;
    this.createdAt = attributes.createdAt;
    this.updatedAt = attributes.updatedAt;
  }

}

module.exports = Item;


