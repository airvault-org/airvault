class ItemList {

  items;

  constructor(items = []) {
    this.items = items;
  }

  get length() {
    return this.items.length;
  }

}

module.exports = ItemList;
