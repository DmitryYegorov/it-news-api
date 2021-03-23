class Error400 extends Error {
  constructor(code) {
    super();
    this.message = "Invalid data";
    this.code = code;
  }
}

module.exports = Error400;
