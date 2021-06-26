import {Item} from './Item';
import {EntityList} from './EntityList';

class ItemList extends EntityList<Item> {

  constructor(items: Item[]) {
    super(items);
  }

}

export {ItemList};
