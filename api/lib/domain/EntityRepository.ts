import {EntityList} from './EntityList';
import {Entity} from './Entity';

// Interface is inspired by Spring Data JPA
// See https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#repositories.core-concepts
interface EntityRepository<E extends Entity> {

  save(entity: E): Promise<E>;

  find(params: any): Promise<EntityList<E>>;

  findById(id: number): Promise<E|null>;

  findByUuid(uuid: string): Promise<E|null>;

  delete(id: number): void;

  deleteByUuid(uuid: string): void;

  existsById(id: number): Promise<boolean>;

  existsByUuid(uuid: string): Promise<boolean>;

}

export {EntityRepository};
