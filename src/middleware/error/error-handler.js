function errorHandler() {
  return async (ctx, next) => {
    // eslint-disable-next-line no-useless-catch
    try {
      await next();
    } catch (e) {
      console.log(e);
      ctx.body = e.message;
      ctx.status = e.code || 500;
    }
  };
}

module.exports = {
  errorHandler,
};
