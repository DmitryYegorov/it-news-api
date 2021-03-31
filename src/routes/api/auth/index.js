const Router = require("koa-router");
const passport = require("koa-passport");
const jwt = require("jsonwebtoken");
const User = require("../../../entities/user");
const { AddUserMiddleware, validate } = require("../users/validate");
const Error400 = require("../../../middleware/error/error400");
const { sendNotification } = require("../../../sendmail");

const { SECRET, DOMAIN } = process.env;
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
  const code = await User.createUser(user);
  const body = `
  <div style="display: flex; width: 80%; margin: 0 auto; flex-direction: column; align-items: center">
  <div style="background: cadetblue; position: relative; width: 100%; min-height: 300px; padding: 20px;">
    <h1 align="center" style="color: #fff;">Dear ${user.name}</h1>
  </div>
  <div style="background: aqua; position: relative; width: 100%; min-height: 300px; padding: 20px;">
    <p align="center">Your account has been created successfully!</p>
    <p align="center">To activate your account, follow the <a href="${DOMAIN}/api/activate?user=${
    user.email
  }&code=${code}&created=${Date.now()}">link</a> (valid for 24 hours)</p>
  </div>
</div>
  `;
  await sendNotification(
    user.email,
    "Your account created, activate this",
    body
  );
  ctx.status = 201;
}

async function login(ctx, next) {
  await passport.authenticate("local", async (err, user) => {
    if (err) {
      throw new Error400(err.message);
    }
    if (user.activationCode) {
      throw new Error400("You have to activate an account!");
    }
    if (user) {
      ctx.login(user, async (e) => {
        if (e) {
          throw new Error400(err.message);
        }
        const body = { id: user.id, email: user.email };
        const token = jwt.sign({ user: body }, SECRET);
        ctx.set("Authorization", `Bearer ${token}`);
        ctx.body = { token };
        ctx.status = 200;
        return ctx.login(user);
      });
    }
  })(ctx, next);
}

module.exports = auth;
