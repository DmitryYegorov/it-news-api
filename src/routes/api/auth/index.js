const Router = require("koa-router");
const passport = require("koa-passport");
const jwt = require("jsonwebtoken");
const User = require("../../../entities/user");
const { AddUserMiddleware, validate } = require("../users/validate");
const Error400 = require("../../../middleware/error/error400");
const {
  activateAccountMail,
  resetPasswordMail,
} = require("../../../services/mail");

const { DOMAIN } = process.env;

const { SECRET } = process.env;
const auth = new Router({
  prefix: "/auth",
});

auth
  .get("/logout", logout)
  .post("/register", validate(AddUserMiddleware), createUser)
  .post("/reset_password", resetPassword)
  .post("/login", login);

async function logout(ctx) {
  if (ctx.isAuthenticated()) {
    ctx.logout();
  }
}

async function createUser(ctx) {
  const user = ctx.request.body;
  const code = await User.createUser(user);
  const link = `${DOMAIN}/api/link/activate?user=${
    user.email
  }&code=${code}&created=${Date.now()}`;
  await activateAccountMail(user.email, "Activate your account test", {
    type: "Activate account",
    name: user.name,
    link,
  });
  ctx.status = 201;
}

async function login(ctx, next) {
  await passport.authenticate("local", async (err, user) => {
    if (err) {
      throw new Error400(err.message);
    }
    if (user.activationCode) {
      throw new Error400("You have to link an account!");
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

async function resetPassword(ctx) {
  const { email } = ctx.request.body;
  if (await User.emailExists(email)) {
    const user = await User.getUserByEmail(email);
    const code = await User.resetPasswordReq(email);
    const link = `${DOMAIN}/api/link/reset_password/?user=${
      user.email
    }&code=${code}&created=${Date.now()}`;
    await resetPasswordMail(email, "Reset your password", {
      type: "Reset your password",
      name: user.name,
      link,
    });
    ctx.status = 200;
  } else {
    throw new Error400("User with that email not exists");
  }
}

module.exports = auth;
