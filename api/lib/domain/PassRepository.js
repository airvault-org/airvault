class PassRepository {

  getById(id) {
    console.log('Returns a Pass');
    throw new Error('You must implement this method');
  }

  find() {
    console.log('Returns a PassList');
    throw new Error('You must implement this method');
  }

}

module.exports = PassRepository;
