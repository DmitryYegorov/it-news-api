const Router = require("koa-router");
const User = require("../../../entities/user");
const {
  AddUserMiddleware,
  UpdateUserMiddleware,
  validate,
} = require("./validate");

const users = new Router({
  prefix: "/users",
});

users
  .get("/", getAllUsers)
  .get("/:id", getUserById)
  .post("/", validate(AddUserMiddleware), createUser)
  .put("/:id", validate(UpdateUserMiddleware), updateUser)
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

async function createUser(ctx) {
  const user = ctx.request.body;
  await User.createUser(user);
  ctx.status = 201;
}

async function updateUser(ctx) {
  const data = ctx.request.body;
  const { id } = ctx.request.params;
  ctx.body = await User.updateUser(id, data);
  ctx.status = 200;
}

async function removeUser(ctx) {
  const { id } = ctx.request.params;
  ctx.body = await User.removeUserById(id);
  ctx.status = 204;
}

module.exports = users;