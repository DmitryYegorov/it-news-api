class Error500 extends Error {
  constructor(message = "Server error") {
    super();
    this.code = 500;
    this.message = message;
  }
}

module.exports = Error500;
