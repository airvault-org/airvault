class Item {

  id;
  uuid;
  type;
  title;
  username;
  password;
  website;
  createdAt;
  updatedAt;
  vaultUuid; // as VaultID, for a business and critic reference information, not like a technical ID

  constructor(attributes = {}) {
    this.id = attributes.id;
    this.uuid = attributes.uuid;
    this.type = attributes.type;
    this.createdAt = attributes.createdAt;
    this.updatedAt = attributes.updatedAt;
    this.vaultUuid = attributes.vaultUuid;
    this.content = attributes;
  }

  get content() {
    return {
      title: this.title,
      username: this.username,
      password: this.password,
      website: this.website,
    };
  }

  set content(props) {
    this.title = props.title;
    this.username = props.username;
    this.password = props.password;
    this.website = props.website;
  }
}

module.exports = Item;


