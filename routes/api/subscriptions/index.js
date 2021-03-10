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
  next();
}

function getSubscriptionById(ctx, next) {
  ctx.body = "Get subscriptions by ID";
  next();
}

function createSubscription(ctx, next) {
  ctx.body = "Create a subscriptions";
  next();
}

function getSubscriptionsByUser(ctx, next) {
  ctx.body = "Get the subscriptions by user";
  next();
}

module.exports = subscription;
