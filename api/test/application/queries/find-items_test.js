const assert = require('assert');
const { findItems } = require('../../../lib/application');
const { IocContainer } = require('../../../lib/infrastructure/ioc');

describe('application/queries/find-items', () => {

  it('should fetch and return all the stored items within a ItemList', async () => {
    // given
    const allThePasses = Symbol('The ItemList');
    const iocContainer = new IocContainer();
    iocContainer.register('itemRepository', {
      findAll: async function() {
        return allThePasses;
      }
    });

    // when
    const actual = await findItems(iocContainer);

    // then
    assert.strictEqual(actual, allThePasses);
  });
});
