const Router = require("koa-router");
const { PasswordMiddleware, validate } = require("../users/validate");
const User = require("../../../entities/user");

const activate = new Router({
  prefix: "/link",
});

activate
  .get("/activate", activateAcc)
  .post("/reset_password", validate(PasswordMiddleware), resetPassword);

async function activateAcc(ctx) {
  const params = ctx.request.query;
  if ((Date.now() - +params.created) / 3600000 <= 24) {
    await User.activateAccount(params.user, +params.code);
    ctx.body = "Your account activated!";
    ctx.status = 200;
  } else {
    ctx.body = "Activation period expired!";
    ctx.status = 400;
  }
}

async function resetPassword(ctx) {
  const params = ctx.request.query;
  const { password } = ctx.request.body;
  if ((Date.now() - +params.created) / 3600000 <= 24) {
    await User.resetPassword(params.user, password, +params.code);
    ctx.body = "Your password updated!";
    ctx.status = 200;
  } else {
    ctx.body = "Activation period expired!";
    ctx.status = 400;
  }
}
module.exports = activate;
