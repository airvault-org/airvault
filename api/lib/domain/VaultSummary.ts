import {Entity} from './Entity';

class VaultSummary extends Entity {

  name: string;
  itemsCount: number;

  constructor(attributes: { id?: number, uuid?: string, name: string, itemsCount: number }) {
    super(attributes.id, attributes.uuid);
    this.name = attributes.name;
    this.itemsCount = attributes.itemsCount;
  }

}

export {VaultSummary};

