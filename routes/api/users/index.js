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
  next();
}

function getUserById(ctx, next) {
  ctx.body = "Get one user by ID";
  next();
}

function createUser(ctx, next) {
  ctx.body = "Create a new user";
  next();
}

function updateUser(ctx, next) {
  ctx.body = "Update a users";
  next();
}

function removeUser(ctx, next) {
  ctx.body = "Delete a users";
  next();
}

module.exports = users;
