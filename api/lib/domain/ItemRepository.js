// Interface is inspired by Spring Data JPA
// See https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#repositories.core-concepts
class ItemRepository {

  save(item) {
    console.log('Returns an Item');
    throw new Error('You must implement this method');
  }

  find({ accountId }) {
    console.log('Returns an ItemList');
    throw new Error('You must implement this method');
  }

  findById(id) {
    console.log('Returns an Item');
    throw new Error('You must implement this method');
  }

  findByUuid(uuid) {
    console.log('Returns an Item');
    throw new Error('You must implement this method');
  }

  findAllByVaultUuid(vaultUuid) {
    console.log('Returns a ItemList');
    throw new Error('You must implement this method');
  }

  delete(id) {
    console.log('Returns nothing');
    throw new Error('You must implement this method');
  }

  deleteByUuid(uuid) {
    console.log('Returns nothing');
    throw new Error('You must implement this method');
  }

  existsById(id) {
    console.log('Returns a boolean');
    throw new Error('You must implement this method');
  }

  existsByUuid(uuid) {
    console.log('Returns a boolean');
    throw new Error('You must implement this method');
  }
}

module.exports = ItemRepository;
