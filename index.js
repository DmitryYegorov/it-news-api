const Koa = require("koa");
const koaCors = require("@koa/cors");
const koaJson = require("koa-json");
const koaLogger = require("koa-logger");
const koaBodyParser = require("koa-bodyparser");
const session = require("koa-session");
const passport = require("koa-passport");
const dbSetup = require("./knex/db-setup");
const { errorHandler } = require("./src/middleware/error/error-handler");

dbSetup();

const app = new Koa();
const { PORT } = process.env;
const api = require("./src/routes/api");

app.keys = ["super-secret-key"];
app.use(
  koaCors({
    origin: "*",
  })
);
app.use(errorHandler());
app.use(koaLogger());
require("./src/auth");

app.use(session(app));
app.use(passport.initialize());
app.use(passport.session());
app.use(koaJson());
app.use(koaBodyParser());
app.use(api.routes());
app.use(api.allowedMethods());
app.listen(PORT);
