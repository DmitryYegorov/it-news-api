const Router = require("koa-router");

const users = new Router();

users
  .get("/users", (ctx, next) => {
    ctx.body = "Get all users";
    next();
  })
  .get("/users/:id", (ctx, next) => {
    ctx.body = "Get one user by ID";
    next();
  })
  .post("/user", (ctx, next) => {
    ctx.body = "Create a new users";
    next();
  })
  .put("/users/:id", (ctx, next) => {
    ctx.body = "Update a users";
    next();
  })
  .delete("/post/:id", (ctx, next) => {
    ctx.body = "Delete a users";
    next();
  });

module.exports = users;
