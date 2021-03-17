const User = require("../models/user");

async function createUser(user) {
  return User.query().insert(user);
}

async function getUserById(id) {
  return User.query().findById(id);
}

async function getAllUsers() {
  return User.query().select();
}

async function updateUser(id, data) {
  return User.query().findById(id).patch(data);
}

async function removeUserById(id) {
  return User.query().findById(id).delete();
}

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  removeUserById,
};
