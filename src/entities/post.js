const Post = require("../models/post");

async function getAllPosts() {
  const posts = await Post.query().select();
  return posts;
}

async function getPostById(id) {
  const post = await Post.query().findById(id);
  return post;
}

async function createPost(post) {
  return Post.query().insert(post);
}

async function updatePost(id, data) {
  return Post.query().findById(id).patch(data);
}

async function removePostById(id) {
  return Post.query().findById(id).delete();
}

async function getPostsByCategory(categoryId) {
  return Post.query()
    .where({
      categoryId,
    })
    .select();
}

async function getPostsByAuthor(author) {
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
