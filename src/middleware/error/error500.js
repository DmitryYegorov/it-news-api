class Error500 extends Error {
  constructor(code, message = "Default message 500") {
    super();
    this.code = code;
    this.message = message;
  }
}

module.exports = Error500;
