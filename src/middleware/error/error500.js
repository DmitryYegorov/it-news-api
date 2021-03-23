class Error500 extends Error {
  constructor(code) {
    super();
    this.code = code;
    this.message = "Server error";
  }
}

module.exports = Error500;
