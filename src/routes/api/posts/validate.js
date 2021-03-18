const yup = require("yup");

const AddPostMiddleware = yup.object.shape({
  title: yup.string().required().max(255),
  text: yup.string().required(),
});

const UpdatePostMiddleware = yup.object.shape({
  title: yup.string().required().max(255),
  text: yup.string().required(),
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
  AddPostMiddleware,
  UpdatePostMiddleware,
  validate,
};
