import {Item} from './Item';

class ItemList {

  items: Item[];

  constructor(items: Item[]) {
    this.items = items;
  }

  get length() {
    return this.items.length;
  }

}

export {ItemList};
