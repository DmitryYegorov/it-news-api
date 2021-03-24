class Error400 extends Error {
  constructor(message = "Invalid data") {
    super();
    this.message = message;
    this.code = 400;
  }
}

module.exports = Error400;
