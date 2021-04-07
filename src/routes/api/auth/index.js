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
  .get("/activate", activateAcc)
  .post("/register", validate(AddUserMiddleware), createUser)
  .post("/reset", validate(ResetPasswordMiddleware), resetPassword)
  .put(
    "/new-password",
    authenticate,
    validate(UpdatePasswordMiddleware),
    updatePassword
  )
  .post("/recovery", recovery)
  .post("/login", validate(AuthMiddleware), login);

async function logout(ctx) {
  ctx.logout();
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
        const token = jwt.sign({ user: body }, SECRET, { expiresIn: "24h" });
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

async function recovery(ctx) {
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

module.exports = auth;
