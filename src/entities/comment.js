const Comment = require("../models/comment");
const Post = require("../models/post");
const User = require("./user");
const Error404 = require("../middleware/error/error404");
const Error400 = require("../middleware/error/error400");

async function getCommentsByPost(postId) {
  await Post.query().findById(postId);
  return Comment.query()
    .joinRelated("authorUser")
    .where({
      postId,
    })
    .select(
      "author_user.name as author",
      "author_user.email as email",
      "text",
      "postId",
      "comments.createdAt",
      "comments.updatedAt"
    );
}

async function getCommentById(id) {
  const comment = await Comment.query()
    .joinRelated("authorUser")
    .where("comments.id", id)
    .select(
      "author_user.name as author",
      "author_user.email as email",
      "text",
      "postId",
      "comments.createdAt",
      "comments.updatedAt"
    )
    .first();
  if (!comment) {
    throw new Error404("Comment not exists");
  }
  return comment;
}

async function createComment(data) {
  const result = await User.getUserById(data.author);
  if (!result) {
    throw new Error400("User not exists");
  }
  await Comment.query().insert(data);
}

async function updateComment(id, text) {
  const comment = await Comment.query().findById(id);
  if (!comment) {
    throw new Error404("Comment not exists");
  }
  await Comment.query()
    .update({
      text,
    })
    .findById(id);
}

async function removeComment(id) {
  const comment = await Comment.query().findById(id);
  if (!comment) {
    throw new Error404("Comment not exists");
  }
  await Comment.query().findById(id).delete();
}

module.exports = {
  getCommentsByPost,
  getCommentById,
  createComment,
  updateComment,
  removeComment,
};
