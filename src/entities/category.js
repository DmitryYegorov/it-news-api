const Category = require("../models/category");
const Error404 = require("../middleware/error/error404");

async function getAllCategories() {
  return Category.query().select();
}

async function getCategoryById(id) {
  const category = await Category.query().findById(id);
  if (!category) {
    throw new Error404("Category not found");
  }
  return Category.query().findById(id);
}

async function createCategory(category) {
  await Category.query().insert(category);
}

async function updateCategory(id, data) {
  const category = await Category.query().findById(id);
  if (!category) {
    throw new Error404();
  }
  await Category.query().findById(id).patch(data);
}

async function removeCategoryById(id) {
  const category = await Category.query().findById(id);
  if (!category) {
    throw new Error404();
  }
  await Category.query().findById(id).delete();
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  removeCategoryById,
};
