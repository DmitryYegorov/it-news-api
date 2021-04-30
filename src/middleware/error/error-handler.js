function errorHandler() {
  return async (ctx, next) => {
    // eslint-disable-next-line no-useless-catch
    try {
      await next();
    } catch (e) {
      ctx.body = e;
    }
  };
}

module.exports = {
  errorHandler,
};
