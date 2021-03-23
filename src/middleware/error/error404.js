class Error404 extends Error {
  constructor(code) {
    super();
    this.message = "Data not found";
    this.code = code;
  }
}

module.exports = Error404;
