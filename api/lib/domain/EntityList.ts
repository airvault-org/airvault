class EntityList<E> {

  entities: E[];

  constructor(entities: E[]) {
    this.entities = entities;
  }

  get length(): number {
    return this.entities.length;
  }

}

export { EntityList };
