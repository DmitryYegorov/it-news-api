class Error404 extends Error {
  constructor(message) {
    super();
    this.message = message || "Data not found";
    this.code = 404;
  }
}

module.exports = Error404;
