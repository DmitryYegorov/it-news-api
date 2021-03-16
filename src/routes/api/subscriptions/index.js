const Router = require("koa-router");
const Subscription = require("../../../entities/subscriptions");

const subscription = new Router({
  prefix: "/subscriptions",
});

subscription
  .get("/", getAllSubscriptions)
  .post("/", createSubscription)
  .get("/user/:user", getSubscriptionsByUser)
  .get("/author/:author", getSubscribers);

async function getAllSubscriptions(ctx, next) {
  try {
    const subscriptions = await Subscription.getAllSubscriptions();
    if (subscriptions.length) {
      ctx.body = subscriptions;
      ctx.status = 200;
      next();
    }
  } catch (e) {
    ctx.body = e;
    ctx.status = 500;
  }
}

async function createSubscription(ctx, next) {
  try {
    const data = ctx.request.body;
    const res = await Subscription.createSubscription(data);
    if (res) {
      ctx.body = res;
      ctx.status = 201;
      next();
    }
  } catch (e) {
    ctx.body = e;
    ctx.status = 500;
  }
}

async function getSubscriptionsByUser(ctx, next) {
  try {
    const { user } = ctx.request.params;
    const subscriptions = await Subscription.getSubscriptionsByUser(user);
    if (subscriptions.length) {
      ctx.body = subscriptions;
      ctx.status = 200;
      next();
    }
  } catch (e) {
    ctx.body = e;
    ctx.status = 500;
  }
}

async function getSubscribers(ctx, next) {
  try {
    const { author } = ctx.request.params;
    const subscriptions = await Subscription.getSubscribersByAuthor(author);
    if (subscriptions.length) {
      ctx.body = subscriptions;
      ctx.status = 200;
      next();
    }
  } catch (e) {
    ctx.body = e;
    ctx.status = 500;
  }
}

module.exports = subscription;
