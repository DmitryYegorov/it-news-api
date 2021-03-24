import * as User from "koa";

const Subscription = require("../models/subscription");
const Error404 = require("../middleware/error/error404");

async function getSubscriptionsByUser(userId) {
  const result = await User.query().findById(userId);
  if (!result) {
    throw new Error404();
  }
  return Subscription.query().select({
    where: {
      subscriber: userId,
    },
  });
}

async function getSubscribersByAuthor(userId) {
  const result = await User.query().findById(userId);
  if (!result) {
    throw new Error404();
  }
  return Subscription.query().select({
    where: {
      author: userId,
    },
  });
}

async function createSubscription(data) {
  return Subscription.query().insert(data);
}

async function removeSubscription(id) {
  const result = await Subscription.query().findById(id);
  if (!result) {
    throw new Error404();
  }
  return Subscription.query().findById(id).delete();
}

module.exports = {
  createSubscription,
  removeSubscription,
  getSubscriptionsByUser,
  getSubscribersByAuthor,
};
