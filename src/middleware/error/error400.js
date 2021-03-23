class Error400 extends Error {
  constructor() {
    super();
    this.message = "Invalid data";
    this.code = 400;
  }
}

module.exports = Error400;
