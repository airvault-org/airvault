const Pass = require('../../domain/Pass');

module.exports = async ({ id, login, password, url } = {}, iocContainer) => {

  const passRepository = iocContainer.get('PassRepository');

  const transientPass = await passRepository.findById(id);

  if (login) {
    transientPass.login = login;
  }
  if (password) {
    transientPass.password = password;
  }
  if (url) {
    transientPass.url = url;
  }
  transientPass.updatedAt = new Date();

  return passRepository.save(transientPass);
}
