const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();
const router = new Router();

router.get("/", (ctx, next) => {
  ctx.body = "<h1>Home GET</h1>";
  next();
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(process.env.PORT, () => {
  console.log("Server has been running...");
});
