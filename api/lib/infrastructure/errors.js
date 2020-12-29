class InfrastructureError extends Error {

  constructor(message) {
    super(message);
  }
}

module.exports = {
  InfrastructureError
};
