const assert = require('assert');
const findPasses = require('../../../lib/application/queries/find-items');
const IocContainer = require('../../../lib/infrastructure/ioc-container');

describe('application/queries/find-items', () => {

  it('should fetch and return all the stored items within a ItemList', async () => {
    // given
    const allThePasses = Symbol('The ItemList');
    const iocContainer = new IocContainer();
    iocContainer.register('ItemRepository', {
      findAll: async function() {
        return allThePasses;
      }
    });

    // when
    const actual = await findPasses(iocContainer);

    // then
    assert.strictEqual(actual, allThePasses);
  });
});
