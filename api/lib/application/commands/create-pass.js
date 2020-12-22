const Pass = require('../../domain/Pass');

module.exports = ({ login, password, url } = {}, iocContainer) => {

  const passRepository = iocContainer.get('PassRepository');

  const now = new Date();

  const transientPass = new Pass({ login, password, url, createdAt: now, updatedAt: now });

  return passRepository.persist(transientPass);
}
