class Pass {

  id;
  login;
  password;
  url;
  createdAt;
  updatedAt;

  constructor(attributes = {}) {
    this.id = attributes.id;
    this.login = attributes.login;
    this.password = attributes.password;
    this.url = attributes.url;
    this.createdAt = attributes.createdAt;
    this.updatedAt = attributes.updatedAt;
  }

}

module.exports = Pass;


