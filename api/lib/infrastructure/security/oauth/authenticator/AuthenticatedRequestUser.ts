class AuthenticatedRequestUser {

  id: any;
  username: string;
  email: string;

  constructor(attributes: { id: any, username: string, email: string }) {
    this.id = attributes.id;
    this.username = attributes.username;
    this.email = attributes.email;
  }

}

export { AuthenticatedRequestUser };
