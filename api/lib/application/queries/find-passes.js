module.exports = (iocContainer) => {

  const passRepository = iocContainer.get('PassRepository');

  return passRepository.findAll();
}
