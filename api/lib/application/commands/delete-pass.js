module.exports = async ({ id }, iocContainer) => {

  const passRepository = iocContainer.get('PassRepository');

  return await passRepository.delete(id);
}
