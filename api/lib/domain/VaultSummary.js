class VaultSummary {

  id;
  uuid;
  name;
  itemsCount;

  constructor(attributes = {}) {
    this.id = attributes.id;
    this.uuid = attributes.uuid;
    this.name = attributes.name;
    this.itemsCount = attributes.itemsCount;
  }

}

module.exports = VaultSummary;


