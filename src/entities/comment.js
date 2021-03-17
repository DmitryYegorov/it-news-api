const Comment = require("../models/comment");

async function getCommentsByPost(postId) {
  return Comment.query()
    .where({
      postId,
    })
    .select();
}

async function getCommentById(id) {
  return Comment.query().findById(id);
}

async function createComment(data) {
  return Comment.query().insert(data);
}

async function updateComment(id, data) {
  return Comment.query().findById(id).patch(data);
}

async function removeComment(id) {
  return Comment.query().findById(id).delete();
}

module.exports = {
  getCommentsByPost,
  getCommentById,
  createComment,
  updateComment,
  removeComment,
};
