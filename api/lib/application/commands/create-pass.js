const Pass = require('../../domain/Pass');

module.exports = async (params = {}, iocContainer) => {

  const passRepository = iocContainer.get('PassRepository');

  const transientPass = new Pass({
    login: params.login,
    password: params.password,
    url: params.url,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const persistedPass = await passRepository.persist(transientPass);

  return persistedPass;
}
