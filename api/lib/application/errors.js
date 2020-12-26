class ApplicationError extends Error {

  constructor(message) {
    super(message);
  }
}

module.exports = {
  ApplicationError
};
