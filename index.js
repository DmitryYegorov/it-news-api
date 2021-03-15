const Koa = require("koa");
const koaCors = require("@koa/cors");
const koaJson = require("koa-json");
const koaLogger = require("koa-logger");
const koaBodyParser = require("koa-bodyparser");
const dbSetup = require("./knex/db-setup");

dbSetup();

const app = new Koa();
const { PORT } = process.env;
const api = require("./src/routes/api");

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message,
    };
  }
});
app.use(
  koaCors({
    origin: "*",
  })
);
app.use(koaLogger());
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
