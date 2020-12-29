class VaultSummary {

  id;
  name;
  itemsCount;

  constructor(attributes = {}) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.itemsCount = attributes.itemsCount;
  }

}

module.exports = VaultSummary;


