class AccountRepository {

  save(account) {
    console.log('Returns an Account');
    throw new Error('You must implement this method');
  }

  findById(id) {
    console.log('Returns an Account');
    throw new Error('You must implement this method');
  }

  findByUuid(uuid) {
    console.log('Returns an Account');
    throw new Error('You must implement this method');
  }

  findAccountWithEncryptedPasswordByEmail(email) {
    console.log('Returns an AccountWithEncryptedPassword');
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

  isUsernameAvailable(username) {
    console.log('Returns a boolean');
    throw new Error('You must implement this method');
  }

  isEmailAvailable(email) {
    console.log('Returns a boolean');
    throw new Error('You must implement this method');
  }

}

module.exports = AccountRepository;
