const Router = require("koa-router");
const Subscription = require("../../../entities/subscriptions");

const subscription = new Router({
  prefix: "/subscriptions",
});

subscription
  .post("/", createSubscription)
  .get("/user/:user", getSubscriptionsByUser)
  .get("/author/:author", getSubscribers)
  .delete("/:id", removeSubscribe);

async function createSubscription(ctx) {
  const data = ctx.request.body;
  const res = await Subscription.createSubscription(data);
  ctx.body = res;
  ctx.status = 201;
}

async function getSubscriptionsByUser(ctx) {
  const { user } = ctx.request.params;
  ctx.body = await Subscription.getSubscriptionsByUser(user);
  ctx.status = 200;
}

async function getSubscribers(ctx) {
  const { author } = ctx.request.params;
  ctx.body = await Subscription.getSubscribersByAuthor(author);
  ctx.status = 200;
}

async function removeSubscribe(ctx) {
  const { id } = ctx.request.body;
  ctx.body = await Subscription.removeSubscription(id);
  ctx.status = 204;
}

module.exports = subscription;
