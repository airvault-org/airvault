const sinon = require('sinon');
const { deleteItem } = require('../../../lib/application');
const { IocContainer } = require('../../../lib/infrastructure/ioc');

describe('application/commands/delete-item', () => {

  it('should delete a given Item and return nothing', async () => {
    // given
    const deleteStub = sinon.stub();
    const iocContainer = new IocContainer();
    iocContainer.register('itemRepository', {
      deleteByUuid: deleteStub
    });
    const itemUuid = '5977cae0-8f54-4927-b054-7eb6e3cccd2d';

    // when
    await deleteItem({ uuid: itemUuid}, iocContainer);

    // then
    sinon.assert.calledWithExactly(deleteStub, itemUuid);
  });
});
