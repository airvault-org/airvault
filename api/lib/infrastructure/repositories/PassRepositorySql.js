const PassRepository = require('../../domain/PassRepository');
const Pass = require('../../domain/Pass');
const PassList = require('../../domain/PassList');

class PassRepositorySql extends PassRepository {

  constructor() {
    super();
  }

  getById(id) {
    return new Pass({
      id: 1,
      login: 'some_login',
      password: 'any_password',
      url: 'http://a.given.url',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  find() {
    const pass1 = new Pass({
      id: 1,
      login: 'some_login',
      password: 'any_password',
      url: 'http://a.given.url',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const pass2 = new Pass({
      id: 2,
      login: 'some_login',
      password: 'any_password',
      url: 'http://a.given.url',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const pass3 = new Pass({
      id: 3,
      login: 'some_login',
      password: 'any_password',
      url: 'http://a.given.url',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return new PassList([pass1, pass2, pass3]);
  }
}

module.exports = PassRepositorySql;
