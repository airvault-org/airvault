const sinon = require('sinon');
const { deleteItem } = require('../../../lib/application');
const { IocContainer } = require('../../../lib/infrastructure/ioc');

describe('application/commands/delete-item', () => {

  it('should delete a given Item and return nothing', async () => {
    // given
    const deleteStub = sinon.stub();
    const iocContainer = new IocContainer();
    iocContainer.register('itemRepository', {
      delete: deleteStub
    });
    const itemId = 1234;

    // when
    await deleteItem({ id: itemId}, iocContainer);

    // then
    sinon.assert.calledWithExactly(deleteStub, itemId);
  });
});
