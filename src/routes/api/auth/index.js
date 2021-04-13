const Router = require("koa-router");
const passport = require("koa-passport");
const jwt = require("jsonwebtoken");
const Auth = require("../../../entities/auth");
const {
  AddUserMiddleware,
  UpdatePasswordMiddleware,
  AuthMiddleware,
  ResetPasswordMiddleware,
  PasswordMiddleware,
  CodeMiddleware,
  validateBody,
  validateQuery,
} = require("./validate");
const Error400 = require("../../../middleware/error/error400");
const Error401 = require("../../../middleware/error/error401");
const { sendNotification } = require("../../../services/mail");
const authenticate = require("../../../middleware/auth");

const { SECRET, JwtExp } = process.env;
const auth = new Router({
  prefix: "/auth",
});

auth
  .get("/logout", authenticate, logout)
  .get("/activate/:code", validateQuery(CodeMiddleware), activateAccount)
  .post("/register", validateBody(AddUserMiddleware), createUser)
  .post("/reset", validateBody(ResetPasswordMiddleware), resetPassword)
  .put(
    "/new-password",
    authenticate,
    validateBody(UpdatePasswordMiddleware),
    updatePassword
  )
  .post(
    "/recovery/:code",
    validateQuery(CodeMiddleware),
    validateBody(PasswordMiddleware),
    recovery
  )
  .post("/login", validateBody(AuthMiddleware), login);

async function logout(ctx) {
  await ctx.logout();
  ctx.status = 204;
}

async function createUser(ctx) {
  const user = ctx.request.body;
  const code = await Auth.createUser(user);
  await sendNotification(
    "Activate your account",
    "activate",
    code,
    user.email,
    user.name
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
  const user = await Auth.getUserByEmail(email);
  if (user) {
    const code = await Auth.resetPassword(user);
    await sendNotification(
      "Update password",
      "newPassword",
      code,
      user.email,
      user.name
    );
    ctx.status = 200;
  } else {
    throw new Error400("User with that email not exists");
  }
}

async function updatePassword(ctx) {
  const data = ctx.request.body;
  await Auth.updatePassword(data.email, data.oldPassword, data.newPassword);
  ctx.status = 200;
}

async function activateAccount(ctx) {
  const { code } = ctx.request.params;
  try {
    jwt.verify(code, SECRET);
  } catch (e) {
    throw new Error401(e.message);
  }
  await Auth.activateAccount(code);
  ctx.body = "Your account activated!";
  ctx.status = 200;
}

async function recovery(ctx) {
  const { code } = ctx.request.params;
  const { password } = ctx.request.body;
  try {
    jwt.verify(code, SECRET);
  } catch (e) {
    throw new Error401(e.message);
  }
  await Auth.resetPassword(password, code);
  ctx.status = 204;
}

module.exports = auth;
