const Router = require("koa-router");
const Subscription = require("../../../entities/subscriptions");
const User = require("../../../entities/user");
const authenticated = require("../../../middleware/auth");
const {
  SubscribeMiddleware,
  UserIdMiddleware,
  AuthorIdMiddleware,
  validateBody,
  validateQuery,
} = require("./validate");

const subscription = new Router({
  prefix: "/subscriptions",
});

subscription
  .post(
    "/",
    authenticated,
    validateBody(SubscribeMiddleware),
    createSubscription
  )
  .get("/user/:user", validateQuery(UserIdMiddleware), getSubscriptionsByUser)
  .get("/author/:author", validateQuery(AuthorIdMiddleware), getSubscribers)
  .delete(
    "/author/:author",
    authenticated,
    validateQuery(AuthorIdMiddleware),
    removeSubscribe
  );

async function createSubscription(ctx) {
  const { user, author } = ctx.request.body;
  await Subscription.createSubscription({
    subscriber: user,
    author,
  });
  ctx.status = 201;
}

async function getSubscriptionsByUser(ctx) {
  const { params } = ctx.request;
  const user = await User.getUserById(params.user);
  ctx.body = await Subscription.getSubscriptionsByUser(user.id);
  ctx.status = 200;
}

async function getSubscribers(ctx) {
  const { params } = ctx.request;
  const author = await User.getUserById(params.author);
  ctx.body = await Subscription.getSubscribersByAuthor(author.id);
  ctx.status = 200;
}

async function removeSubscribe(ctx) {
  const { author } = ctx.request.params;
  const { user } = ctx.request.body;
  await Subscription.removeSubscription(user, author);
  ctx.status = 204;
}

module.exports = subscription;
