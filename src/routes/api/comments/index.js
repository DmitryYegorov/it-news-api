const Router = require("koa-router");
const Comment = require("../../../entities/comment");
const authenticated = require("../../../middleware/auth");
const {
  AddCommentSchema,
  UpdateCommentSchema,
  IdSchema,
  validateBody,
  validateQuery,
} = require("./validate");

const comments = new Router({
  prefix: "/comments",
});

comments
  .get("/:id", getCommentById)
  .get("/post/:post", getCommentsByPost)
  .post("/", authenticated, validateBody(AddCommentSchema), createComment)
  .put(
    "/:id",
    authenticated,
    validateQuery(IdSchema),
    validateBody(UpdateCommentSchema),
    updateComment
  )
  .delete("/:id", authenticated, validateQuery(IdSchema), removeComment);

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
  const { postId, text, user } = ctx.request.body;
  await Comment.createComment({
    postId,
    text,
    author: user.id,
  });
  ctx.status = 201;
}

async function updateComment(ctx) {
  const { id } = ctx.request.params;
  const { text } = ctx.request.body;
  await Comment.updateComment(id, text);
  ctx.status = 201;
}

async function removeComment(ctx) {
  const { id } = ctx.request.params;
  await Comment.removeComment(id);
  ctx.status = 204;
}

module.exports = comments;
