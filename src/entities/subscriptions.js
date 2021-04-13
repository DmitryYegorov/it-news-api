const Subscription = require("../models/subscription");
const User = require("./user");
const Error404 = require("../middleware/error/error404");

async function getSubscriptionsByUser(userId) {
  await User.getUserById(userId);
  return Subscription.query()
    .where("subscriber", userId)
    .joinRelated("subscriptions_users")
    .select("name", "email");
}

async function getSubscribersByAuthor(userId) {
  return Subscription.query().select({
    where: {
      author: userId,
    },
  });
}

async function createSubscription(data) {
  await Subscription.query().insert(data);
}

async function removeSubscription(subscriber, author) {
  const result = await Subscription.query()
    .where({
      author,
      subscriber,
    })
    .first();
  if (!result) {
    throw new Error404();
  }
  await Subscription.query().findById(result.id).delete();
}

module.exports = {
  createSubscription,
  removeSubscription,
  getSubscriptionsByUser,
  getSubscribersByAuthor,
};
