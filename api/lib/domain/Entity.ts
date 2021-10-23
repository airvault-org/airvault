abstract class Entity {

  id?: number;
  uuid?: string;

  protected constructor(id?: number, uuid?: string) {
    this.id = id;
    this.uuid = uuid;
  }

}

export { Entity };
