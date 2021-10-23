class AuthenticatedRequestUser {

  id: number;
  username: string;
  email: string;

  constructor(attributes: { id: number, username: string, email: string }) {
    this.id = attributes.id;
    this.username = attributes.username;
    this.email = attributes.email;
  }

}

export { AuthenticatedRequestUser };
