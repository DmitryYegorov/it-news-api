const Router = require("koa-router");
const User = require("../../../entities/user");
const { AddUserMiddleware, validate } = require("../users/validate");

const users = new Router({
  prefix: "/auth",
});

users.post("/register", createUser, validate(AddUserMiddleware));

async function createUser(ctx, next) {
  const user = ctx.request.body;
  const data = await User.createUser(user);
  ctx.status = 201;
  ctx.body = data;
  next();
}

module.exports = users;
