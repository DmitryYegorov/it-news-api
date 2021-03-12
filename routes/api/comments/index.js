const Router = require("koa-router");

const comments = new Router();

comments
  .get("/comments/post/:id", getAllComments)
  .get("/comment/:id", getCommentById)
  .post("/comment/:post_id", createComment)
  .put("/comment/:id", updateComment)
  .delete("/comment/:id", removeComment);

function getAllComments(ctx, next) {
  ctx.body = { message: "Get all comments by post" };
  ctx.status = 200;
  next();
}

function getCommentById(ctx, next) {
  ctx.body = "Get one comment by ID";
  ctx.status = 200;
  next();
}

function createComment(ctx, next) {
  ctx.body = "Create a new comment";
  ctx.status = 201;
  next();
}

function updateComment(ctx, next) {
  ctx.body = "Update a comment";
  ctx.status = 200;
  next();
}

function removeComment(ctx, next) {
  ctx.body = "Delete a comment";
  ctx.status = 204;
  next();
}

module.exports = comments;
