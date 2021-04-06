const Router = require("koa-router");
const User = require("../../../entities/user");
const { UpdateUserMiddleware, validate } = require("./validate");

const users = new Router({
  prefix: "/users",
});

users
  .get("/", getAllUsers)
  .get("/:id", getUserById)
  .put("/:id", validate(UpdateUserMiddleware), updateUser);

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

async function updateUser(ctx) {
  const data = ctx.request.body;
  const { id } = ctx.request.params;
  ctx.body = await User.updateUser(id, data);
  ctx.status = 200;
}

module.exports = users;
