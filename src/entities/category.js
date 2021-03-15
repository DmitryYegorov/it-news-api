const Category = require("../models/category");

async function getAllCategories() {
  const categories = await Category.query().select();
  return categories;
}

async function getCategoryById(id) {
  const category = await Category.query().findById(id);
  return category;
}

async function createCategory(post) {
  const newCategory = Category.query().insert(post);
  return newCategory;
}

async function updateCategory(id, data) {
  const updated = await Category.query().findById(id).patch(data);
  return updated;
}

async function removeCategoryById(id) {
  const res = await Category.query().findById(id).delete();
  return res;
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  removeCategoryById,
};
