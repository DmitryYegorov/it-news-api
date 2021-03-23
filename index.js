const Koa = require("koa");
const koaCors = require("@koa/cors");
const koaJson = require("koa-json");
const koaLogger = require("koa-logger");
const koaBodyParser = require("koa-bodyparser");
const passport = require("koa-passport");
const session = require("koa-session");
const dbSetup = require("./knex/db-setup");

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
app.use(koaLogger());
app.use(session(app));
require("./src/auth");

app.use(passport.initialize());
app.use(passport.session());
app.use(koaJson());
app.use(
  koaBodyParser({
    onerror: (err, ctx) => {
      ctx.throw("body parse error", 422);
    },
  })
);
app.use(api.routes());
app.use(api.allowedMethods());
app.listen(PORT);
