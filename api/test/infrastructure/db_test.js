const environment = require('../../config/environment');
const { Sequelize, Op } = require('sequelize');
const assert = require('assert');

xdescribe('db', () => {

  let sequelize;

  beforeEach(() => {
    sequelize = new Sequelize(environment.db.url);
  })

  afterEach(() => {
    return sequelize.close();
  })

  it('should be able to access test DB', async () => {
    try {
    // given

    // when
      await sequelize.authenticate();

      // then
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  });

});

xdescribe('Querying', () => {

  const models = require('../../db/models');
  const { Account, Vault, Item } = models;

  before(async () => {
    // Reset database
    const queryInterface = models.sequelize.getQueryInterface();
    await queryInterface.dropAllTables();

    // Run migrations
    await require('../../db/migrations/20201222223256-create-account').up(queryInterface, Sequelize);
    await require('../../db/migrations/20201222225043-create-vault').up(queryInterface, Sequelize);
    await require('../../db/migrations/20201224020123-create-item').up(queryInterface, Sequelize);

    // Insert data
    const accountA = await Account.create({ username: 'alice', encryptedPassword: 'password', email: 'alice@example.com' });
    const vaultA = await Vault.create({ name: 'Private', accountId: accountA.id });
    const item1 = await Item.create({ vaultId: vaultA.id, title: 'Google', username: 'alice@example.com', password: 'P@Ssw0rD', website: 'https://accounts.google.com/ServiceLogin' });
    const item2 = await Item.create({ vaultId: vaultA.id, title: 'Twitter', username: 'alice@example.com', password: 'P@Ssw0rD', website: 'https://twitter.com/login' });
    const item3 = await Item.create({ vaultId: vaultA.id, title: 'GitHub', username: 'alice@example.com', password: 'P@Ssw0rD', website: 'https://github.com/login' });

    const accountB = await Account.create({ username: 'bob', encryptedPassword: 'password', email: 'bob@example.com' });
    const vaultB = await Vault.create({ name: 'Private', accountId: accountB.id });
    const item4 = await Item.create({ vaultId: vaultB.id, title: 'Google', username: 'bob@example.com', password: 'P@Ssw0rD', website: 'https://accounts.google.com/ServiceLogin' });
    const item5 = await Item.create({ vaultId: vaultB.id, title: 'GitHub', username: 'bob@example.com', password: 'P@Ssw0rD', website: 'https://github.com/login' });

  });

  it('should find all items of a given user with multiple vaults', async () => {
    // given
    const input = '/Log';
    const search = `%${input.trim()}%`;

    // when
    const items = await Item.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: search }, },
          { username: { [Op.iLike]: search }, },
          { website: { [Op.iLike]: search }, },
        ]
      },
      include: {
        model: Vault,
        attributes: [],
        where: {
          accountId: 1,
        }
      },
      order: [
        ['title', 'ASC']
      ]
    });

    // then
    assert.strictEqual(items.length, 2);
    assert.strictEqual(items[0].title, 'GitHub');
    assert.strictEqual(items[1].title, 'Twitter');
  });

});
