const Koa = require("koa");
const koaCors = require("@koa/cors");
const koaJson = require("koa-json");
const koaLogger = require("koa-logger");
const koaBodyParser = require("koa-bodyparser");

const app = new Koa();
const { PORT } = process.env;
const api = require("./routes/api");

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
