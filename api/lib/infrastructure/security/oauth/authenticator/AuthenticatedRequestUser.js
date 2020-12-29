class AuthenticatedRequestUser {

  id;
  username;
  email;

  constructor(attributes = {}) {
    this.id = attributes.id;
    this.username = attributes.username;
    this.email = attributes.email;
  }

}

module.exports = AuthenticatedRequestUser;


