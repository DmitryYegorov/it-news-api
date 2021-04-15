const Error404 = require("../middleware/error/error404");
const Post = require("../models/post");
const CategoryEntity = require("./category");
const Error400 = require("../middleware/error/error400");

async function getAllPosts() {
  return Post.query()
    .joinRelated("[authorUser, categoryName]")
    .select(
      "posts.id as id",
      "author_name.name as author",
      "category_name.name as category",
      "posts.title",
      "posts.text",
      "posts.createdAt"
    );
}

async function getPostById(id) {
  const post = await Post.query().findById(id);
  if (!post) {
    throw new Error404("Post not found");
  }
  return post;
}

async function createPost(post) {
  const category = await CategoryEntity.getCategoryById(post.categoryId);
  if (!category) {
    throw new Error400(
      "You cannot public a post because a category not exists"
    );
  }
  await Post.query().insert(post);
}

async function updatePost(id, data) {
  const post = await Post.query().findById(id);
  if (!post) {
    throw new Error400("Post not exists");
  }
  const title = data.title || post.title;
  const text = data.text || post.text;
  const categoryId = data.categoryId || post.categoryId;
  await Post.query().update({ title, text, categoryId }).findById(post.id);
}

async function removePostById(id) {
  const post = await Post.query().findById(id);
  if (!post) {
    throw new Error400("Post not exists");
  }
  await Post.query().findById(id).delete();
}

async function getPostsByCategory(categoryId) {
  const post = await Post.query().where({ categoryId }).select().first();
  if (!post) {
    throw new Error404();
  }
  return Post.query()
    .where({
      categoryId,
    })
    .select();
}

async function getPostsByAuthor(author) {
  const post = await Post.query().where({ author }).select().first();
  if (!post) {
    throw new Error404();
  }
  return Post.query()
    .where({
      author,
    })
    .select();
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  removePostById,
  getPostsByCategory,
  getPostsByAuthor,
};
