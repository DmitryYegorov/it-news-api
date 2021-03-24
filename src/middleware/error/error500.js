class Error500 extends Error {
  constructor(message) {
    super();
    this.code = 500;
    this.message = message || "Server error";
  }
}

module.exports = Error500;
