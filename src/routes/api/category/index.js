const Router = require("koa-router");
const Category = require("../../../entities/category");

const categories = new Router({
  prefix: "/categories",
});

categories
  .get("/", getAllCategories)
  .get("/:id", getCategoryById)
  .post("/", createCategory)
  .put("/:id", updateCategory)
  .delete("/:id", removeCategory);

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
  ctx.body = await Category.createCategory(category);
  ctx.status = 201;
}

async function updateCategory(ctx) {
  const data = ctx.request.body;
  const { id } = ctx.request.params;
  ctx.body = await Category.updateCategory(id, data);
  ctx.status = 200;
}

async function removeCategory(ctx) {
  const { id } = ctx.request.params;
  ctx.body = await Category.removeCategoryById(id);
  ctx.status = 204;
}

module.exports = categories;
