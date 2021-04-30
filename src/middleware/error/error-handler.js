function errorHandler() {
  return async (ctx, next) => {
    // eslint-disable-next-line no-useless-catch
    try {
      await next();
    } catch (e) {
      ctx.body = e.message;
      ctx.status = e.status;
    }
  };
}

module.exports = {
  errorHandler,
};
