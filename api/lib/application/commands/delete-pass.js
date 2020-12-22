module.exports = ({ id }, iocContainer) => {

  const passRepository = iocContainer.get('PassRepository');

  return passRepository.delete(id);
}
