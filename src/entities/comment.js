const Comment = require("../models/comment");
const Post = require("../models/post");
const Error404 = require("../middleware/error/error404");

async function getCommentsByPost(postId) {
  const post = await Post.query().findById(postId);
  if (!post) {
    throw new Error404("Post not exists");
  }
  return Comment.query()
    .where({
      postId,
    })
    .select();
}

async function getCommentById(id) {
  const comment = await Comment.query().findById(id);
  if (!comment) {
    throw new Error404("Comment not exists");
  }
  return comment;
}

async function createComment(data) {
  return Comment.query().insert(data);
}

async function updateComment(id, data) {
  const comment = await Comment.query().findById(id);
  if (!comment) {
    throw new Error404("Comment not exists");
  }
  return Comment.query().findById(id).patch(data);
}

async function removeComment(id) {
  const comment = await Comment.query().findById(id);
  if (!comment) {
    throw new Error404("Comment not exists");
  }
  return Comment.query().findById(id).delete();
}

module.exports = {
  getCommentsByPost,
  getCommentById,
  createComment,
  updateComment,
  removeComment,
};
