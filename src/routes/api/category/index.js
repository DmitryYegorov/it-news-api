const Router = require("koa-router");
const Category = require("../../../entities/category");

const categories = new Router({
  prefix: "/comments",
});

categories
  .get("/", getAllCategories)
  .get("/:id", getCategoryById)
  .post("/", createCategory)
  .put("/:id", updateCategory)
  .delete("/:id", removeCategory);

async function getAllCategories(ctx, next) {
  try {
    const data = await Category.getAllCategories();
    if (data.length) {
      ctx.body = data;
      ctx.status = 200;
      next();
    }
  } catch (e) {
    ctx.body = e;
    ctx.status = 400;
  }
}

async function getCategoryById(ctx, next) {
  try {
    const { id } = ctx.request.params;
    const category = await Category.getCategoryById(id);
    if (category) {
      ctx.body = category;
      ctx.status = 200;
      next();
    }
  } catch (e) {
    ctx.body = e;
    ctx.status = 400;
  }
}

async function createCategory(ctx, next) {
  try {
    const category = ctx.request.body;
    const res = await Category.createCategory(category);
    if (res) {
      ctx.body = res;
      ctx.status = 201;
      next();
    }
  } catch (e) {
    ctx.status = 400;
    ctx.body = e;
  }
}

async function updateCategory(ctx, next) {
  try {
    const data = ctx.request.body;
    const { id } = ctx.request.params;
    const res = await Category.updateCategory(id, data);
    if (res) {
      ctx.body = res;
      ctx.status = 200;
      next();
    }
  } catch (e) {
    ctx.status = 400;
    ctx.body = e;
  }
}

async function removeCategory(ctx, next) {
  try {
    const { id } = ctx.request.params;
    const removed = await Category.removeCategoryById(id);
    if (removed) {
      ctx.body = removed;
      ctx.status = 204;
      next();
    }
  } catch (e) {
    ctx.status = 400;
    ctx.body = e;
  }
}

module.exports = categories;
