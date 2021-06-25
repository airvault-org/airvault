class ItemContent {
  title: string;
  username: string;
  password: string;
  website: string;

  constructor(title: string, username: string, password: string, website: string) {
    this.title = title;
    this.username = username;
    this.password = password;
    this.website = website;
  }

}

class Item {

  id?: number;
  uuid: string;
  type: string;
  content: ItemContent;
  createdAt: Date;
  updatedAt: Date;
  vaultUuid: string; // as VaultID, for a business and critic reference information, not like a technical ID

  constructor(attributes: { id?: number; uuid: string; type: string; content: ItemContent, createdAt: Date; updatedAt: Date; vaultUuid: string }) {
    this.id = attributes.id;
    this.uuid = attributes.uuid;
    this.type = attributes.type;
    this.createdAt = attributes.createdAt;
    this.updatedAt = attributes.updatedAt;
    this.vaultUuid = attributes.vaultUuid;
    this.content = attributes.content;
  }

}

export {Item, ItemContent};

