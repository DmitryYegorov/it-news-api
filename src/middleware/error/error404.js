class Error404 extends Error {
  constructor(message = "Data not found") {
    super();
    this.message = message;
    this.code = 404;
  }
}

module.exports = Error404;
