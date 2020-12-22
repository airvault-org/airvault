const assert = require('assert');
const findPasses = require('../../../lib/application/queries/find-passes');
const IocContainer = require('../../../lib/infrastructure/ioc-container');

describe('application/queries/find-passes', () => {

  it('should fetch and return all the stored passes within a PassList', async () => {
    // given
    const allThePasses = Symbol('The PassList');
    const iocContainer = new IocContainer();
    iocContainer.register('PassRepository', {
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
