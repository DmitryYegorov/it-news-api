const yup = require("yup");
const Error404 = require("../../../middleware/error/error404");
const ErrorService = require("../../../middleware/error/errorService");

const AddUserMiddleware = yup.object().shape({
  name: yup.string().trim().required(),
  email: yup.string().trim().email().required(),
  password: yup.string().trim().min(8).max(24).required(),
});

const UpdateUserMiddleware = yup.object().shape({
  name: yup.string().trim(),
  email: yup.string().trim().email(),
  password: yup.string().trim().min(8).max(24),
});

function validate(schema) {
  return async (ctx, next) => {
    // eslint-disable-next-line no-useless-catch
    try {
      await schema.validate(ctx.request.body);
      await next();
    } catch (e) {
      if (e instanceof Error404) {
        throw ErrorService.errorThrow(404);
      }
      throw ErrorService.errorThrow(400);
    }
  };
}

module.exports = {
  AddUserMiddleware,
  UpdateUserMiddleware,
  validate,
};
