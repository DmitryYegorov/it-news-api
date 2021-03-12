const Router = require("koa-router");
const User = require("../../../entities/user");

const users = new Router();

users
  .get("/users", getAllUsers)
  .get("/users/:id", getUserById)
  .post("/user", createUser)
  .put("/user/:id", updateUser)
  .delete("/user/:id", removeUser);

async function getAllUsers(ctx, next) {
  try {
    ctx.body = await User.getAllUsers();
    next();
  } catch (e) {
    console.log(e);
    ctx.body = e;
    ctx.status = 500;
  }
}

async function getUserById(ctx, next) {
  try {
    const { id } = ctx.request.params;
    const user = await User.getUserById(id);
    ctx.body = JSON.stringify(user);
    ctx.status = 200;
    next();
  } catch (e) {
    console.error(e);
    ctx.body = e;
    ctx.status = 500;
  }
}

async function createUser(ctx, next) {
  try {
    const user = ctx.request.body;
    if (user) {
      const res = await User.createUser(user);
      ctx.status = 201;
      ctx.body = JSON.stringify(res);
      next();
    }
  } catch (e) {
    console.log(e);
    ctx.status = 500;
    ctx.body = e;
  }
}

async function updateUser(ctx, next) {
  try {
    const data = ctx.request.body;
    const { id } = ctx.request.params;
    if (data) {
      const res = await User.updateUser(id, data);
      ctx.status = 200;
      ctx.body = JSON.stringify(res);
      next();
    }
  } catch (e) {
    console.log(e);
    ctx.status = 500;
    ctx.body = e;
  }
}

async function removeUser(ctx, next) {
  try {
    const { id } = ctx.request.params;
    ctx.body = await User.removeUserById(id);
    ctx.status = 204;
    next();
  } catch (e) {
    console.log(e);
    ctx.status = 500;
    ctx.body = e;
  }
}

module.exports = users;
