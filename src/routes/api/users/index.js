const Router = require("koa-router");
const User = require("../../../entities/user");

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
  try {
    const user = ctx.request.body;
    if (user) {
      User.createUser(user).then((res) => {
        ctx.statusCode = 201;
        ctx.body = res;
        next();
      });
    }
  } catch (e) {
    console.log(e);
    ctx.statusCode = 500;
    ctx.body = e;
  }
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
