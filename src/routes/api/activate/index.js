const Router = require("koa-router");
const User = require("../../../entities/user");

const activate = new Router({
  prefix: "/activate",
});

activate.get("/", activateAcc);

async function activateAcc(ctx) {
  const params = ctx.request.query;
  ctx.body = params;
  if ((Date.now() - +params.created) / 3600000 <= 24) {
    await User.activateAccount(params.user, +params.code);
    ctx.body = "Your account activated!";
    ctx.status = 200;
  } else {
    ctx.body = "Activation period expired!";
    ctx.status = 400;
  }
}
module.exports = activate;
