const Router = require("koa-router");
const passport = require("koa-passport");
const jwt = require("jsonwebtoken");
const User = require("../../../entities/user");
const Auth = require("../../../entities/auth");
const {
  AddUserMiddleware,
  UpdatePasswordMiddleware,
  AuthMiddleware,
  ResetPasswordMiddleware,
  PasswordMiddleware,
  validate,
} = require("../users/validate");
const Error400 = require("../../../middleware/error/error400");
const { activateEmail, newPasswordEmail } = require("../../../services/mail");
const authenticate = require("../../../middleware/auth");

const { SECRET } = process.env;
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
  .post("/recovery", validate(PasswordMiddleware), recovery)
  .post("/login", validate(AuthMiddleware), login);

async function logout(ctx) {
  ctx.body = "lalal";
}

async function createUser(ctx) {
  const user = ctx.request.body;
  const code = await User.createUser(user);
  await activateEmail(code);
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
        const token = jwt.sign(body, SECRET, { expiresIn: "24h" });
        ctx.set("Authorization", `Bearer ${token}`);
        ctx.body = token;
        ctx.status = 200;
        return ctx.login(user);
      });
    }
  })(ctx, next);
}

async function resetPassword(ctx) {
  const { email } = ctx.request.body;
  const user = await User.getUserByEmail(email);
  if (user) {
    const code = await Auth.resetPassword(user);
    await newPasswordEmail(code);
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
  const { code } = ctx.request.query;
  const decoded = jwt.verify(code, SECRET);
  if (decoded.exp * 1000 < Date.now()) {
    throw new Error400("Invalid link activation!");
  }
  await User.activateAccount(code);
  ctx.body = "Your account activated!";
  ctx.status = 200;
}

async function recovery(ctx) {
  const { code } = ctx.request.query;
  const { password } = ctx.request.body;
  const { id, exp } = await jwt.verify(code, SECRET);
  if (exp * 1000 < Date.now()) {
    throw new Error400("Invalid link!");
  }
  await User.resetPassword(id, password, code);
  ctx.status = 204;
}

module.exports = auth;
