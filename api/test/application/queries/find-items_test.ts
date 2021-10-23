import * as assert from 'assert';
import { findItems } from '../../../lib/application';
import { IocContainer } from '../../../lib/infrastructure/ioc';

describe('application/queries/find-items', () => {

  it('should fetch and return all the stored items within a ItemList', async () => {
    // given
    const allThePasses = Symbol('The ItemList');
    const iocContainer = new IocContainer();
    iocContainer.register('itemRepository', {
      find: async function() {
        return allThePasses;
      }
    });

    // when
    const actual = await findItems({ accountId: 1 }, iocContainer);

    // then
    assert.strictEqual(actual, allThePasses);
  });
});
