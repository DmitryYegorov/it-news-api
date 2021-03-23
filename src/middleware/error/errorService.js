const Error400 = require("./error400");
const Error404 = require("./error404");
const Error500 = require("./error500");

function errorHandler() {
  return async (ctx, next) => {
    // eslint-disable-next-line no-useless-catch
    try {
      await next();
    } catch (e) {
      ctx.body = e.message;
      ctx.status = e.code;
    }
  };
}

function errorThrow(code) {
  switch (code) {
    case 400:
      throw new Error400(400);
      // eslint-disable-next-line no-unreachable
      break;
    case 404:
      throw new Error404(404);
      // eslint-disable-next-line no-unreachable
      break;
    default:
      throw new Error500(500);
      // eslint-disable-next-line no-unreachable
      break;
  }
}

module.exports = {
  errorHandler,
  errorThrow,
};
