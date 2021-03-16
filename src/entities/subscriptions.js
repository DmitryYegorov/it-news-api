const Subscription = require("../models/subscription");

async function getAllSubscriptions() {
  return Subscription.query().select();
}

async function getSubscriptionsByUser(userId) {
  return Subscription.query().select({
    where: {
      subscriber: userId,
    },
  });
}

async function getSubscribersByAuthor(userId) {
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
  return Subscription.query().findById(id).delete();
}

module.exports = {
  createSubscription,
  removeSubscription,
  getAllSubscriptions,
  getSubscriptionsByUser,
  getSubscribersByAuthor,
};
