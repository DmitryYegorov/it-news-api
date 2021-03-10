const Router = require("koa-router");

const comments = new Router();

comments
  .get("/comments/post/:id", getAllComments)
  .get("/comment/:id", getCommentById)
  .post("/comment", createComment)
  .put("/comment/:id", updateComment)
  .delete("/comment/:id", removeComment);

function getAllComments(ctx, next) {
  ctx.body = "Get all comments by post";
  next();
}

function getCommentById(ctx, next) {
  ctx.body = "Get one comment by ID";
  next();
}

function createComment(ctx, next) {
  ctx.body = "Create a new comment";
  next();
}

function updateComment(ctx, next) {
  ctx.body = "Update a comment";
  next();
}

function removeComment(ctx, next) {
  ctx.body = "Delete a comment";
  next();
}

module.exports = comments;
