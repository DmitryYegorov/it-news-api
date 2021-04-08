const yup = require("yup");
const Error404 = require("../../../middleware/error/error404");
const Error400 = require("../../../middleware/error/error400");

const AddCommentMiddleware = yup.object().shape({
  text: yup.string().trim().required(),
});

const UpdateCommentMiddleware = yup.object().shape({
  text: yup.string().trim().required(),
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
  validate,
  AddCommentMiddleware,
  UpdateCommentMiddleware,
};
