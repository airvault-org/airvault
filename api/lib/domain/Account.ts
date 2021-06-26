import {Entity} from './Entity';

class Account extends Entity {

  name: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(attributes: { id?: number, uuid?: string, name: string, username: string, email: string, createdAt: Date, updatedAt: Date }) {
    super(attributes.id, attributes.uuid);
    this.name = attributes.name;
    this.username = attributes.username;
    this.email = attributes.email;
    this.createdAt = attributes.createdAt;
    this.updatedAt = attributes.updatedAt;
  }

}

export {Account};


