class Error404 extends Error {
  constructor() {
    super();
    this.message = "Data not found";
    this.code = 404;
  }
}

module.exports = Error404;
