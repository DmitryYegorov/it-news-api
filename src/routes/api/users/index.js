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
  .post(validate(AddUserMiddleware), "/", createUser)
  .put(validate(UpdateUserMiddleware), "/:id", updateUser)
  .delete("/:id", removeUser);

async function getAllUsers(ctx, next) {
  const data = await User.getAllUsers();
  ctx.body = data;
  ctx.status = 200;
  next();
}

async function getUserById(ctx, next) {
  const { id } = ctx.request.params;
  ctx.body = await User.getUserById(id);
  ctx.status = 200;
  next();
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
  const data = ctx.request.body;
  const { id } = ctx.request.params;
  ctx.body = await User.updateUser(id, data);
  ctx.status = 200;
  next();
}

async function removeUser(ctx, next) {
  const { id } = ctx.request.params;
  ctx.body = await User.removeUserById(id);
  ctx.status = 204;
  next();
}

module.exports = users;
