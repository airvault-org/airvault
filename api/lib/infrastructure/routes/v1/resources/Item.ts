export default class Item {
  id: string;
  type: string;
  title: string;
  username: string;
  password: string;
  website: string;
  created: string;
  updated: string;
  vault_id: string;

  constructor(id: string, type: string, title: string, username: string, password: string, website: string, created: string, updated: string, vault_id: string) {
    this.id = id;
    this.type = type;
    this.title = title;
    this.username = username;
    this.password = password;
    this.website = website;
    this.created = created;
    this.updated = updated;
    this.vault_id = vault_id;
  }
}


