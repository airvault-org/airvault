import {Entity} from './Entity';

enum ItemType {
  LOGIN = 'login',
  NOTE = 'note',
  PASSWORD = 'password',
  CREDIT_CARD = 'credit_card',
}

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

class Item extends Entity {

  type: ItemType;
  content: ItemContent;
  createdAt: Date;
  updatedAt: Date;
  vaultUuid: string; // as VaultID, for a business and critic reference information, not like a technical ID

  constructor(attributes: { id?: number, uuid?: string, createdAt: Date, updatedAt: Date, type: ItemType, content: ItemContent, vaultUuid: string }) {
    super(attributes.id, attributes.uuid);
    this.createdAt = attributes.createdAt;
    this.updatedAt = attributes.updatedAt;
    this.type = attributes.type;
    this.vaultUuid = attributes.vaultUuid;
    this.content = attributes.content;
  }

}

export {Item, ItemContent, ItemType};

