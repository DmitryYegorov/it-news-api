class Error400 extends Error {
  constructor(message) {
    super();
    this.message = message || "Invalid data";
    this.code = 400;
  }
}

module.exports = Error400;
