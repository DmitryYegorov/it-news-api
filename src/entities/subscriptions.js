const Subscription = require("../models/subscription");

async function getAllSubscriptions() {
  return Subscription.query().select();
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
};
