const Error400 = require("./error400");
const Error404 = require("./error404");
const Error500 = require("./error500");

function errorHandler() {
  return async (ctx, next) => {
    // eslint-disable-next-line no-useless-catch
    try {
      await next();
    } catch (e) {
      if (e instanceof Error400) {
        ctx.body = e.message || "Invalid data sent";
        ctx.status = e.code || 400;
      } else if (e instanceof Error404) {
        ctx.body = e.message || "Bad request message";
        ctx.status = e.code || 404;
      } else {
        ctx.body = e.message;
        ctx.status = e.code;
      }
    }
  };
}

function errorThrow(code) {
  if (code === 400) {
    throw Error400(code, "Enter valid data");
  } else if (code === 404) {
    throw Error404(code, "Your data not found");
  } else {
    throw new Error500(500, "Bad, Bab, very bad");
  }
}

module.exports = {
  errorHandler,
  errorThrow,
};
