class VaultSummary {

  id;
  uuid;
  name;
  itemsCount;

  constructor(attributes = {}) {
    this.id = attributes.id;
    this.uuid = attributes.id;
    this.name = attributes.name;
    this.itemsCount = attributes.itemsCount;
  }

}

module.exports = VaultSummary;


