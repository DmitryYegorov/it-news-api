class Error500 extends Error {
  constructor() {
    super();
    this.code = 500;
    this.message = "Server error";
  }
}

module.exports = Error500;
