const Router = require("koa-router");
const Subscription = require("../../../entities/subscriptions");
const authenticated = require("../../../middleware/auth");
const { SubscribeMiddleware, validate } = require("./validate");

const subscription = new Router({
  prefix: "/subscriptions",
});

subscription
  .post("/", authenticated, validate(SubscribeMiddleware), createSubscription)
  .get("/user/:user", getSubscriptionsByUser)
  .get("/author/:author", getSubscribers)
  .delete(
    "/:id",
    authenticated,
    validate(SubscribeMiddleware),
    removeSubscribe
  );

async function createSubscription(ctx) {
  const { user, author } = ctx.request.body;
  const data = {
    subscriber: user.id,
    author,
  };
  await Subscription.createSubscription(data);
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
  const { user, author } = ctx.request.body;
  await Subscription.removeSubscription(user.id, author);
  ctx.status = 204;
}

module.exports = subscription;
