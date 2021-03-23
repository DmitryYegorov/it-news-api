const Category = require("../models/category");
const ErrorService = require("../middleware/error/errorService");

async function getAllCategories() {
  return Category.query().select();
}

async function getCategoryById(id) {
  const category = await Category.query().findById(id);
  if (!category) {
    throw ErrorService.errorThrow(404);
  }
  return Category.query().findById(id);
}

async function createCategory(post) {
  return Category.query().insert(post);
}

async function updateCategory(id, data) {
  const category = await Category.query().findById(id);
  if (!category) {
    throw ErrorService.errorThrow(404);
  }
  return Category.query().findById(id).patch(data);
}

async function removeCategoryById(id) {
  const category = await Category.query().findById(id);
  if (!category) {
    throw ErrorService.errorThrow(404);
  }
  return Category.query().findById(id).delete();
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  removeCategoryById,
};
