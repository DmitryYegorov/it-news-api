const Router = require("koa-router");
const User = require("../../../entities/user");

const users = new Router({
  prefix: "users",
});

users
  .get("/", getAllUsers)
  .get("/:id", getUserById)
  .post("/", createUser)
  .put("/:id", updateUser)
  .delete("/:id", removeUser);

async function getAllUsers(ctx, next) {
  try {
    const data = await User.getAllUsers();
    if (data.length) {
      ctx.body = data;
      ctx.status = 200;
      next();
    }
  } catch (e) {
    ctx.body = e;
    ctx.status = 400;
  }
}

async function getUserById(ctx, next) {
  try {
    const { id } = ctx.request.params;
    const data = await User.getUserById(id);
    if (data) {
      ctx.body = data;
      ctx.status = 200;
      next();
    }
  } catch (e) {
    ctx.body = e;
    ctx.status = 400;
  }
}

async function createUser(ctx, next) {
  try {
    const user = ctx.request.body;
    if (user) {
      const data = await User.createUser(user);
      ctx.status = 201;
      ctx.body = data;
      next();
    }
  } catch (e) {
    ctx.status = 400;
    ctx.body = e;
  }
}

async function updateUser(ctx, next) {
  try {
    const data = ctx.request.body;
    const { id } = ctx.request.params;
    const res = await User.updateUser(id, data);
    if (res) {
      ctx.status = 200;
      ctx.body = res;
      next();
    }
  } catch (e) {
    ctx.status = 400;
    ctx.body = e;
  }
}

async function removeUser(ctx, next) {
  try {
    const { id } = ctx.request.params;
    const data = await User.removeUserById(id);
    if (data) {
      ctx.body = data;
      ctx.status = 204;
      next();
    }
  } catch (e) {
    ctx.status = 400;
    ctx.body = e;
  }
}

module.exports = users;
