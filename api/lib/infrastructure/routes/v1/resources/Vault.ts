export default class Vault {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  accountUuid: string;

  constructor(id: string, name: string, createdAt: string, updatedAt: string, accountUuid: string) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.accountUuid = accountUuid;
  }
}
