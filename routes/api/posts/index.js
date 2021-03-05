const Router = require("koa-router");

const posts = new Router();

posts
  .get("/posts", (ctx, next) => {
    ctx.body = "Get all posts";
    next();
  })
  .get("/post/:id", (ctx, next) => {
    ctx.body = "Get one post by ID";
    next();
  })
  .post("/post", (ctx, next) => {
    ctx.body = "Create a new post";
    next();
  })
  .put("/post/:id", (ctx, next) => {
    ctx.body = "Update a new post";
    next();
  })
  .delete("/post/:id", (ctx, next) => {
    ctx.body = "Delete a post";
    next();
  });

module.exports = posts;
