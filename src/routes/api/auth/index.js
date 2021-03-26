const Router = require("koa-router");
const passport = require("koa-passport");
const User = require("../../../entities/user");
const { AddUserMiddleware, validate } = require("../users/validate");

const auth = new Router({
  prefix: "/auth",
});

auth
  .get("/logout", logout)
  .post("/register", validate(AddUserMiddleware), createUser)
  .post("/login", login);

async function logout(ctx) {
  if (ctx.isAuthenticated()) {
    ctx.logout();
  }
}

async function createUser(ctx) {
  const user = ctx.request.body;
  await User.createUser(user);
  ctx.status = 201;
}

async function login(ctx, next) {
  await passport.authenticate("local", (err, user) => {
    if (err) {
      throw err;
    }
    if (user) {
      ctx.login(user);
      ctx.status = 200;
    }
  })(ctx, next);
}

module.exports = auth;
