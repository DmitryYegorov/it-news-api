const Router = require("koa-router");
const Comment = require("../../../entities/comment");
const authenticated = require("../../../middleware/auth");

const comments = new Router({
  prefix: "/comments",
});

comments
  .get("/:id", getCommentById)
  .get("/post/:post", getCommentsByPost)
  .post("/", authenticated, createComment)
  .put("/:id", authenticated, updateComment)
  .delete("/:id", authenticated, removeComment);

async function getCommentById(ctx) {
  const { id } = ctx.request.params;
  ctx.body = await Comment.getCommentById(id);
  ctx.status = 200;
}

async function getCommentsByPost(ctx) {
  const { post } = ctx.request.params;
  ctx.body = await Comment.getCommentsByPost(post);
  ctx.status = 200;
}

async function createComment(ctx) {
  const comment = ctx.request.body;
  ctx.body = await Comment.createComment(comment);
  ctx.status = 201;
}

async function updateComment(ctx) {
  const { id } = ctx.request.params;
  const comment = ctx.request.body;
  const res = await Comment.createComment(id, comment);
  ctx.status = 201;
  ctx.body = res;
}

async function removeComment(ctx) {
  const { id } = ctx.request.params;
  ctx.body = await Comment.removeComment(id);
  ctx.status = 204;
}

module.exports = comments;
