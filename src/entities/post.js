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
  const newPost = Post.query().insert(post);
  return newPost;
}

async function updatePost(id, data) {
  const updated = await Post.query().findById(id).patch(data);
  return updated;
}

async function removePostById(id) {
  const res = await Post.query().findById(id).delete();
  return res;
}

async function getPostsByCategory(category) {
  const posts = await Post.query()
    .where({
      postcategory: category,
    })
    .select();
  return posts;
}

async function getPostsByAuthor(author) {
  const posts = await Post.query()
    .where({
      postauthor: author,
    })
    .select();
  return posts;
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
