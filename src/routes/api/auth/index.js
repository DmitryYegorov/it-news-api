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
} = require("./validate");
const Error400 = require("../../../middleware/error/error400");
const { sendNotification } = require("../../../services/mail");
const authenticate = require("../../../middleware/auth");

const { SECRET, JwtExp } = process.env;
const auth = new Router({
  prefix: "/auth",
});

auth
  .get("/logout", authenticate, logout)
  .get("/activate", activateAccount)
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
  await ctx.logout();
  ctx.status = 204;
}

async function createUser(ctx) {
  const user = ctx.request.body;
  const code = await User.createUser(user);
  await sendNotification(code, "activate");
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
        const token = jwt.sign(body, SECRET, { expiresIn: JwtExp });
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
    await sendNotification(code, "password");
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

async function activateAccount(ctx) {
  const { code } = ctx.request.query;
  await jwt.verify(code, SECRET, {}, (err) => {
    if (err) {
      throw new Error400("Invalid link activation!");
    }
  });
  await User.activateAccount(code);
  ctx.body = "Your account activated!";
  ctx.status = 200;
}

async function recovery(ctx) {
  const { code } = ctx.request.query;
  const { password } = ctx.request.body;
  await jwt.verify(code, SECRET, {}, (err) => {
    if (err) {
      throw new Error400("Invalid link!");
    }
  });
  await User.resetPassword(password, code);
  ctx.status = 204;
}

module.exports = auth;
