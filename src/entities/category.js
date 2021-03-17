const Category = require("../models/category");

async function getAllCategories() {
  return Category.query().select();
}

async function getCategoryById(id) {
  return Category.query().findById(id);
}

async function createCategory(post) {
  return Category.query().insert(post);
}

async function updateCategory(id, data) {
  return Category.query().findById(id).patch(data);
}

async function removeCategoryById(id) {
  return Category.query().findById(id).delete();
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  removeCategoryById,
};
