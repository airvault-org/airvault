// Interface is inspired by Spring Data JPA
// See https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#repositories.core-concepts
class PassRepository {

  save(pass) {
    console.log('Returns a Pass');
    throw new Error('You must implement this method');
  }

  findById(id) {
    console.log('Returns a Pass');
    throw new Error('You must implement this method');
  }

  findAll() {
    console.log('Returns a PassList');
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

module.exports = PassRepository;
