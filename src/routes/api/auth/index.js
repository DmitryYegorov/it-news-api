const Router = require("koa-router");
const passport = require("koa-passport");
// const bcrypt = require("bcryptjs"); move to entity
const User = require("../../../entities/user");
const { AddUserMiddleware, validate } = require("../users/validate");

const users = new Router({
  prefix: "/auth",
});

users
  .get("/logout", logout)
  .post("/register", createUser, validate(AddUserMiddleware))
  .post("/login", login);

async function logout(ctx) {
  if (ctx.isAuthenticated()) {
    ctx.logout();
  }
}

async function createUser(ctx) {
  const user = ctx.request.body;
  const data = await User.createUser(user);
  ctx.status = 201;
  ctx.body = data;
}

async function login(ctx) {
  return passport.authenticate("local", (err, user) => {
    ctx.login(user);
  })(ctx);
}

module.exports = users;
