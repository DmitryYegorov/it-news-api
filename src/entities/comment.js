const Comment = require("../models/comment");

async function getCommentsByPost(post) {
  const comments = await Comment.query()
    .where({
      commentpost: post,
    })
    .select();
  return comments;
}

async function getCommentById(id) {
  const comment = await Comment.query().findById(id);
  return comment;
}

async function createComment(data) {
  const comment = await Comment.query().insert(data);
  return comment;
}

async function updateComment(id, data) {
  const newComment = await Comment.query().findById(id).patch(data);
  return newComment;
}

async function removeComment(id) {
  const res = await Comment.query().findById(id).delete();
  return res;
}

module.exports = {
  getCommentsByPost,
  getCommentById,
  createComment,
  updateComment,
  removeComment,
};
