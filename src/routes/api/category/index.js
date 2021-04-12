const Router = require("koa-router");
const Category = require("../../../entities/category");
const {
  CategoryMiddleware,
  IdMiddleware,
  validateBody,
  validateQuery,
} = require("./validate");
const authenticated = require("../../../middleware/auth");

const categories = new Router({
  prefix: "/categories",
});

categories
  .get("/", getAllCategories)
  .get("/:id", validateQuery(IdMiddleware), getCategoryById)
  .post("/", validateBody(CategoryMiddleware), createCategory)
  .put(
    "/:id",
    authenticated,
    validateQuery(IdMiddleware),
    validateBody(CategoryMiddleware),
    updateCategory
  )
  .delete("/:id", authenticated, validateQuery(IdMiddleware), removeCategory);

async function getAllCategories(ctx) {
  ctx.body = await Category.getAllCategories();
  ctx.status = 200;
}

async function getCategoryById(ctx) {
  const { id } = ctx.request.params;
  ctx.body = await Category.getCategoryById(id);
  ctx.status = 200;
}

async function createCategory(ctx) {
  const category = ctx.request.body;
  await Category.createCategory(category);
  ctx.status = 201;
}

async function updateCategory(ctx) {
  const data = ctx.request.body;
  const { id } = ctx.request.params;
  await Category.updateCategory(id, data);
  ctx.status = 204;
}

async function removeCategory(ctx) {
  const { id } = ctx.request.params;
  await Category.removeCategoryById(id);
  ctx.status = 204;
}

module.exports = categories;
