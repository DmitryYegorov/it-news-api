class Error404 extends Error {
  constructor(code, message = "net danyh!") {
    super();
    this.message = message;
    this.code = code;
  }
}

module.exports = Error404;
