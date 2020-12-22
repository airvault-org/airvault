module.exports = (params = {}, iocContainer) => {
  const passRepository = iocContainer.get('PassRepository');
  const passList = passRepository.findAll();
  return passList;
}
