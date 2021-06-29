import {Entity} from './Entity';

class Vault extends Entity {

  name: string;
  createdAt: Date;
  updatedAt: Date;
  accountUuid: string;

  constructor(attributes: { id?: number, uuid?: string, createdAt: Date, updatedAt: Date, name: string, accountUuid: string }) {
    super(attributes.id, attributes.uuid);
    this.createdAt = attributes.createdAt;
    this.updatedAt = attributes.updatedAt;
    this.name = attributes.name;
    this.accountUuid = attributes.accountUuid;
  }

}

export {Vault};
