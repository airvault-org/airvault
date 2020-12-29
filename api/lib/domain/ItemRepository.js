// Interface is inspired by Spring Data JPA
// See https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#repositories.core-concepts
class ItemRepository {

  save(item) {
    console.log('Returns a Item');
    throw new Error('You must implement this method');
  }

  findById(id) {
    console.log('Returns a Item');
    throw new Error('You must implement this method');
  }

  findAllByVaultId(vaultId) {
    console.log('Returns a ItemList');
    throw new Error('You must implement this method');
  }

  delete(id) {
    console.log('Returns nothing');
    throw new Error('You must implement this method');
  }

  existsById(id) {
    console.log('Returns a boolean');
    throw new Error('You must implement this method');
  }

}

module.exports = ItemRepository;
