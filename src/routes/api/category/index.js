const Router = require("koa-router");
const Category = require("../../../entities/category");

const categories = new Router();

categories
  .get("/categories", getAllCategories)
  .get("/categories/:id", getCategoryById)
  .post("/categories", createCategory)
  .put("/categories/:id", updateCategory)
  .delete("/categories/:id", removeCategory);

async function getAllCategories(ctx, next) {
  try {
    ctx.body = await Category.getAllCategories();
    next();
  } catch (e) {
    console.log(e);
    ctx.body = e;
    ctx.status = 500;
  }
}

async function getCategoryById(ctx, next) {
  try {
    const { id } = ctx.request.params;
    const category = await Category.getUserById(id);
    ctx.body = JSON.stringify(category);
    ctx.status = 200;
    next();
  } catch (e) {
    console.error(e);
    ctx.body = e;
    ctx.status = 500;
  }
}

async function createCategory(ctx, next) {
  try {
    const category = ctx.request.body;
    if (category) {
      const res = await Category.createCategory(category);
      ctx.status = 201;
      ctx.body = JSON.stringify(res);
      next();
    }
  } catch (e) {
    console.log(e);
    ctx.status = 500;
    ctx.body = e;
  }
}

async function updateCategory(ctx, next) {
  try {
    const data = ctx.request.body;
    const { id } = ctx.request.params;
    if (data) {
      const res = await Category.updateCategory(id, data);
      ctx.status = 200;
      ctx.body = JSON.stringify(res);
      next();
    }
  } catch (e) {
    console.log(e);
    ctx.status = 500;
    ctx.body = e;
  }
}

async function removeCategory(ctx, next) {
  try {
    const { id } = ctx.request.params;
    ctx.body = await Category.removeCategoryById(id);
    ctx.status = 204;
    next();
  } catch (e) {
    console.log(e);
    ctx.status = 500;
    ctx.body = e;
  }
}

module.exports = categories;
