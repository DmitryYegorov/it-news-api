const Router = require("koa-router");

const subscription = new Router({
  prefix: "/subscription",
});

subscription
  .get("/", (ctx, next) => {
    ctx.body = "Get all subscriptions";
    next();
  })
  .get("/:id", (ctx, next) => {
    ctx.body = "Get subscription by ID";
    next();
  })
  .post("/", (ctx, next) => {
    ctx.body = "Create a subscription";
    next();
  })
  .get("/:user", (ctx, next) => {
    ctx.body = "Get the subscriptions by user";
    next();
  });

module.exports = subscription;
