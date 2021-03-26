const Router = require("koa-router");
const User = require("../../../entities/user");
const { UpdateUserMiddleware, validate } = require("./validate");

const users = new Router({
  prefix: "/users",
});

users
  .get("/", getAllUsers)
  .get("/:id", getUserById)
  .put("/:id", updateUser, validate(UpdateUserMiddleware))
  .delete("/:id", removeUser);

async function getAllUsers(ctx) {
  const data = await User.getAllUsers();
  ctx.status = 200;
  ctx.body = data;
}

async function getUserById(ctx) {
  const { id } = ctx.request.params;
  ctx.body = await User.getUserById(id);
  ctx.status = 200;
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

async function removeUser(ctx) {
  const { id } = ctx.request.params;
  ctx.body = await User.removeUserById(id);
  ctx.status = 204;
}

module.exports = users;
