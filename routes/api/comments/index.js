const Router = require("koa-router");

const comments = new Router();

comments
  .get("/comments/post/:id", (ctx, next) => {
    ctx.body = "Get all comments by post";
    next();
  })
  .get("/comment/:id", (ctx, next) => {
    ctx.body = "Get one comment by ID";
    next();
  })
  .post("/comment", (ctx, next) => {
    ctx.body = "Create a new comment";
    next();
  })
  .put("/comment/:id", (ctx, next) => {
    ctx.body = "Update a comment";
    next();
  })
  .delete("/comment/:id", (ctx, next) => {
    ctx.body = "Delete a comment";
    next();
  });

module.exports = comments;
