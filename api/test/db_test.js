const assert = require('assert');
const environment = require('../environment');
const { Sequelize } = require('sequelize');

xdescribe('db', () => {

  let sequelize;

  beforeEach(() => {
    sequelize = new Sequelize(environment.db.url);
  })

  afterEach(() => {
    return sequelize.close();
  })

  it('should be able to access test DB', async () => {
    // given

    // when
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }

    // then
  });
});
