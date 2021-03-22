class Error400 extends Error {
  constructor(code, message = "Default message 400") {
    super();
    this.message = message;
    this.code = code;
  }
}

module.exports = Error400;
