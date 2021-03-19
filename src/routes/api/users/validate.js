const yup = require("yup");

const AddUserMiddleware = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(24).required(),
});

const UpdateUserMiddleware = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(24).required(),
});

function validate(schema) {
  return async (ctx, next) => {
    // eslint-disable-next-line no-useless-catch
    try {
      await schema.validate(ctx.request.body);
      next();
    } catch (e) {
      throw e;
    }
  };
}

module.exports = {
  AddUserMiddleware,
  UpdateUserMiddleware,
  validate,
};
