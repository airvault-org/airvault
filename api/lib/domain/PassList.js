class PassList {

  passes;

  constructor(items = []) {
    this.passes = items;
  }

  get length() {
    return this.passes.length;
  }

}

module.exports = PassList;
