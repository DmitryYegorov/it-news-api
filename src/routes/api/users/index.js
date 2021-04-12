const Router = require("koa-router");
const User = require("../../../entities/user");
const {
  UpdateUserMiddleware,
  IdMiddleware,
  validateBody,
  validateQuery,
} = require("./validate");
const authenticated = require("../../../middleware/auth");

const users = new Router({
  prefix: "/users",
});

users
  .get("/", getAllUsers)
  .get("/:id", validateQuery(IdMiddleware), getUserById)
  .put(
    "/:id",
    authenticated,
    validateQuery(IdMiddleware),
    validateBody(UpdateUserMiddleware),
    updateUser
  )
  .delete("/:id", authenticated, validateQuery(IdMiddleware), removeUserById);

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

async function removeUserById(ctx) {
  const { id } = ctx.request.params;
  await User.removeUserById(id);
  ctx.status = 204;
}

module.exports = users;
