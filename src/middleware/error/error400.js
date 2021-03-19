class Error400 extends Error {
  constructor(code, message) {
    super();
    this.message = message;
    this.code = code;
  }
}

module.exports = Error400;
