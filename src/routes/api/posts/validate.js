const yup = require("yup");
const Error400 = require("../../../middleware/error/error400");
const Error404 = require("../../../middleware/error/error404");

const PostSchema = yup.object().shape({
  title: yup.string().trim().max(255).required(),
  text: yup.string().trim().required(),
  categoryId: yup.number().required(),
});

const IdSchema = yup.object().shape({
  id: yup.number().min(1).required(),
});

const CategoryIdSchema = yup.object().shape({
  category: yup.number().min(1).required(),
});

const AuthorIdSchema = yup.object().shape({
  author: yup.number().min(1).required(),
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
  IdSchema,
  PostSchema,
  CategoryIdSchema,
  AuthorIdSchema,
  validateQuery,
  validateBody,
};
