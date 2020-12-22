const sinon = require('sinon');
const deletePass = require('../../../lib/application/commands/delete-pass');
const IocContainer = require('../../../lib/infrastructure/ioc-container');

describe('application/commands/delete-pass', () => {

  it('should delete a given Pass and return nothing', async () => {
    // given
    const deleteStub = sinon.stub();
    const iocContainer = new IocContainer();
    iocContainer.register('PassRepository', {
      delete: deleteStub
    });
    const passId = 1234;

    // when
    await deletePass({ id: passId}, iocContainer);

    // then
    sinon.assert.calledWithExactly(deleteStub, passId);
  });
});
