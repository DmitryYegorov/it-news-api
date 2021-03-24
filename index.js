const Koa = require("koa");
const koaCors = require("@koa/cors");
const koaJson = require("koa-json");
const koaLogger = require("koa-logger");
const koaBodyParser = require("koa-bodyparser");
const dbSetup = require("./knex/db-setup");
const { errorHandler } = require("./src/middleware/error/error-handler");

dbSetup();

const app = new Koa();
const { PORT } = process.env;
const api = require("./src/routes/api");

app.use(
  koaCors({
    origin: "*",
  })
);
app.use(errorHandler());
app.use(koaLogger());
app.use(koaJson());
app.use(koaBodyParser());
app.use(api.routes());
app.use(api.allowedMethods());
app.listen(PORT);
