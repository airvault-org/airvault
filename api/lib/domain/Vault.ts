import {Entity} from './Entity';
import {ItemList} from './ItemList';

class Vault extends Entity {

  name: string;
  createdAt: Date;
  updatedAt: Date;
  items: ItemList;
  accountUuid: string;

  constructor(attributes: { id?: number, uuid?: string, name: string, createdAt: Date, updatedAt: Date, items: ItemList, accountUuid: string }) {
    super(attributes.id, attributes.uuid);
    this.name = attributes.name;
    this.createdAt = attributes.createdAt;
    this.updatedAt = attributes.updatedAt;
    this.items = attributes.items || [];
    this.accountUuid = attributes.accountUuid;
  }

}

export {Vault};
