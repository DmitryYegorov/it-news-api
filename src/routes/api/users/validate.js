const yup = require("yup");
const Error404 = require("../../../middleware/error/error404");
const Error400 = require("../../../middleware/error/error400");

const UpdateUserMiddleware = yup.object().shape({
  name: yup.string().trim(),
  email: yup.string().trim().email(),
});

const IdMiddleware = yup.object().shape({
  id: yup.number().min(1).required(),
});

function validateBody(schema) {
  return async (ctx, next) => {
    // eslint-disable-next-line no-useless-catch
    try {
      await schema.validate(ctx.request.body);
      await next();
    } catch (e) {
      if (e instanceof Error404) {
        throw new Error404();
      }
      throw new Error400(e.message || "Check the entered data");
    }
  };
}

function validateQuery(schema) {
  return async (ctx, next) => {
    // eslint-disable-next-line no-useless-catch
    try {
      await schema.validate(ctx.request.params);
      await next();
    } catch (e) {
      if (e instanceof Error404) {
        throw new Error404();
      }
      throw new Error400(e.message || "Check the entered data");
    }
  };
}

module.exports = {
  UpdateUserMiddleware,
  IdMiddleware,
  validateBody,
  validateQuery,
};
