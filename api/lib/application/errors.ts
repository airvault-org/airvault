class ApplicationError extends Error {

  constructor(message: any) {
    super(message);
  }
}

export {
  ApplicationError
};
