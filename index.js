const Koa = require("koa");

const app = new Koa();

app.use(async (ctx, next) => {
  await next();
  console.log(`${ctx.method} ${ctx.url}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

app.use(async (ctx) => {
  ctx.body = '<h1 style="color: green;">Hello, World!</h1>';
  if (ctx.method === "GET" && ctx.url === "/about") {
    ctx.body = "<h1>About</h1>";
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server has been running...");
});
