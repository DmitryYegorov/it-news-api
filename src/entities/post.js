const Error404 = require("../middleware/error/error404");
const Post = require("../models/post");
const UserEntity = require("./user");
const CategoryEntity = require("./category");
const Error400 = require("../middleware/error/error400");

async function getAllPosts() {
  const posts = await Post.query().select();
  return posts;
}

async function getPostById(id) {
  const post = await Post.query().findById(id);
  if (!post) {
    throw new Error404();
  }
  return post;
}

async function createPost(post) {
  const user = await UserEntity.getUserById(post.author);
  const category = await CategoryEntity.getCategoryById(post.categoryId);
  if (!user || !category) {
    throw new Error400(
      "You cannot public a post because user or category not exists"
    );
  }
  await Post.query().insert(post);
}

async function updatePost(id, data) {
  const post = await Post.query().findById(id);
  if (!post) {
    throw new Error404();
  }
  await Post.query().findById(id).patch(data);
}

async function removePostById(id) {
  const post = await Post.query().findById(id);
  if (!post) {
    throw new Error404();
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
