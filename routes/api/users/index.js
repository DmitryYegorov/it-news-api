const Router = require("koa-router");

const users = new Router();

users
  .get("/users", getAllUsers)
  .get("/users/:id", getUserById)
  .post("/user", createUser)
  .put("/user/:id", updateUser)
  .delete("/user/:id", removeUser);

function getAllUsers(ctx, next) {
  ctx.body = "Get all users";
  ctx.status = 200;
  next();
}

function getUserById(ctx, next) {
  ctx.body = "Get one user by ID";
  ctx.status = 200;
  next();
}

function createUser(ctx, next) {
  ctx.body = "Create a new user";
  ctx.status = 201;
  next();
}

function updateUser(ctx, next) {
  ctx.body = "Update a users";
  ctx.status = 200;
  next();
}

function removeUser(ctx, next) {
  ctx.body = "Delete a users";
  ctx.status = 204;
  next();
}

module.exports = users;
