class VaultRepository {

  save(account) {
    console.log('Returns a Account');
    throw new Error('You must implement this method');
  }

  getByUuidAndAccountId(id, accountId) {
    console.log('Returns a Vault');
    throw new Error('You must implement this method');
  }

  findById(id) {
    console.log('Returns a Vault');
    throw new Error('You must implement this method');
  }

  findByUuid(uuid) {
    console.log('Returns a Vault');
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

  listAllUserVaultSummaries(accountId) {
    console.log('Returns a list of VaultSummary');
    throw new Error('You must implement this method');
  }

  existsByIdAndAccountId(id, accountId) {
    console.log('Returns a boolean');
    throw new Error('You must implement this method');
  }
}

module.exports = VaultRepository;
