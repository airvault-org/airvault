class Item {

  id;
  type;
  title;
  username;
  password;
  website;
  createdAt;
  updatedAt;
  vaultId; // as VaultID, for a business and critic reference information, not like a technical ID

  constructor(attributes = {}) {
    this.id = attributes.id;
    this.type = attributes.type;
    this.title = attributes.title;
    this.username = attributes.username;
    this.password = attributes.password;
    this.website = attributes.website;
    this.createdAt = attributes.createdAt;
    this.updatedAt = attributes.updatedAt;
    this.vaultId = attributes.vaultId;
  }

}

module.exports = Item;


