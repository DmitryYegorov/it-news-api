const Router = require("koa-router");

const subscription = new Router({
  prefix: "/subscriptions",
});

subscription
  .get("/", (ctx, next) => {
    ctx.body = "Get all subscriptions";
    next();
  })
  .get("/:id", (ctx, next) => {
    ctx.body = "Get subscriptions by ID";
    next();
  })
  .post("/", (ctx, next) => {
    ctx.body = "Create a subscriptions";
    next();
  })
  .get("/user/:user", (ctx, next) => {
    ctx.body = "Get the subscriptions by user";
    next();
  });

module.exports = subscription;
