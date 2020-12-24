class VaultRepository {

  save(account) {
    console.log('Returns a Account');
    throw new Error('You must implement this method');
  }

  findById(id) {
    console.log('Returns a Account');
    throw new Error('You must implement this method');
  }

  findAll() {
    console.log('Returns a AccountList');
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

  listAllUserVaultSummaries(userId) {
    throw new Error('You must implement this method');
  }

}

module.exports = VaultRepository;
