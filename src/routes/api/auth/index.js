const Router = require("koa-router");
const passport = require("koa-passport");
const jwt = require("jsonwebtoken");
const User = require("../../../entities/user");
const {
  AddUserMiddleware,
  UpdatePasswordMiddleware,
  AuthMiddleware,
  ResetPasswordMiddleware,
  validate,
} = require("../users/validate");
const Error400 = require("../../../middleware/error/error400");
const { sendNotification } = require("../../../services/mail");
const authenticate = require("../../../middleware/auth");

const { DOMAIN, SECRET } = process.env;
const auth = new Router({
  prefix: "/auth",
});

auth
  .get("/logout", authenticate, logout)
  .post("/register", validate(AddUserMiddleware), createUser)
  .post("/recovery", validate(ResetPasswordMiddleware), resetPassword)
  .put(
    "/new-password",
    authenticate,
    validate(UpdatePasswordMiddleware),
    updatePassword
  )
  .post("/login", validate(AuthMiddleware), login);

async function logout(ctx) {
  await ctx.logout();
}

async function createUser(ctx) {
  const user = ctx.request.body;
  const code = await User.createUser(user);
  const link = `${DOMAIN}/api/link/activate?user=${
    user.email
  }&code=${code}&created=${Date.now()}`;
  await sendNotification(user.email, "Activate your account test", {
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
      throw new Error400("You have to activate an account!");
    }
    if (user) {
      ctx.login(user, async (e) => {
        if (e) {
          throw new Error400(err.message);
        }
        const body = { id: user.id, email: user.email };
        const token = jwt.sign({ user: body }, SECRET, { expires: "24h" });
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
    const code = await User.resetPasswordReq(user);
    const link = `${DOMAIN}/api/link/reset_password/?user=${
      user.email
    }&code=${code}&created=${Date.now()}`;
    await sendNotification(email, "Reset your password", {
      type: "Reset your password",
      name: user.name,
      link,
    });
    ctx.status = 200;
  } else {
    throw new Error400("User with that email not exists");
  }
}

async function updatePassword(ctx) {
  const data = ctx.request.body;
  await User.updatePassword(data.email, data.oldPassword, data.newPassword);
  ctx.status = 200;
}

module.exports = auth;
