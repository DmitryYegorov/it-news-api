const yup = require("yup");
const Error404 = require("../../../middleware/error/error404");
const Error400 = require("../../../middleware/error/error400");

const AddUserMiddleware = yup.object().shape({
  name: yup.string().trim().required(),
  email: yup.string().trim().email().required(),
  password: yup.string().trim().min(8).max(24).required(),
});

const UpdateUserMiddleware = yup.object().shape({
  name: yup.string().trim(),
  email: yup.string().trim().email(),
});

const PasswordMiddleware = yup.object().shape({
  password: yup.string().trim().min(8).max(24).required(),
});

function validate(schema) {
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

module.exports = {
  AddUserMiddleware,
  UpdateUserMiddleware,
  PasswordMiddleware,
  validate,
};
