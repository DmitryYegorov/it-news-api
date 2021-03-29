const Router = require("koa-router");
const User = require("../../../entities/user");

const users = new Router({
  prefix: "/activate",
});

users.put("/", activate);

async function activate(ctx) {
  const params = ctx.request.query;
  ctx.body(params);
  if (Date.now() - +params.created <= 24 * 3600000) {
    const user = await User.getUserByEmail(params.email);
    console.log(user);
    await User.activateAccount(user.id, +params.code);
  }
}
