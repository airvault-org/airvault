class AuthenticatedRequestClient {

  id: number;

  constructor(attributes: { id: number }) {
    this.id = attributes.id;
  }

}

export { AuthenticatedRequestClient };
