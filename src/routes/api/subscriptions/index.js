const Router = require("koa-router");

const subscription = new Router({
  prefix: "/subscriptions",
});

subscription
  .get("/", getAllSubscriptions)
  .get("/:id", getSubscriptionById)
  .post("/", createSubscription)
  .get("/user/:user", getSubscriptionsByUser);

function getAllSubscriptions(ctx, next) {
  ctx.body = "Get all subscriptions";
  ctx.status = 200;
  next();
}

function getSubscriptionById(ctx, next) {
  ctx.body = "Get subscriptions by ID";
  ctx.status = 200;
  next();
}

function createSubscription(ctx, next) {
  ctx.body = "Create a subscriptions";
  ctx.status = 201;
  next();
}

function getSubscriptionsByUser(ctx, next) {
  ctx.body = "Get the subscriptions by user";
  ctx.status = 200;
  next();
}

module.exports = subscription;
