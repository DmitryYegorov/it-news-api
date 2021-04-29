class Error401 extends Error {
  constructor(message = "You need to be authenticated!") {
    super();
    this.message = message;
    this.code = 401;
  }
}

module.exports = Error401;
