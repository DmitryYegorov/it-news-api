const Category = require("../models/category");
const PostEntity = require("./post");
const Error404 = require("../middleware/error/error404");
const Error400 = require("../middleware/error/error400");

async function getAllCategories() {
  return Category.query().select();
}

async function getCategoryById(id) {
  const category = await Category.query().findById(id);
  if (!category) {
    throw new Error404();
  }
  return Category.query().findById(id);
}

async function createCategory(category) {
  return Category.query().insert(category);
}

async function updateCategory(id, data) {
  const category = await Category.query().findById(id);
  if (!category) {
    throw new Error404();
  }
  return Category.query().findById(id).patch(data);
}

async function removeCategoryById(id) {
  const category = await Category.query().findById(id);
  const postsByCategory = await PostEntity.getPostsByCategory(id);
  if (!category) {
    throw new Error404();
  }
  if (postsByCategory !== 0) {
    throw new Error400(
      "You cannot remove the category because posts of this category exist"
    );
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
