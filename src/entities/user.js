const User = require("../models/user");

async function createUser(user) {
  const newUser = await User.query().insert(user);
  return newUser;
}

async function getUserById(id) {
  const user = await User.query().findById(id);
  return user;
}

async function getAllUsers() {
  const users = await User.query().select();
  return users;
}

async function updateUser(id, data) {
  const updated = await User.query().findById(id).patch(data);
  return updated;
}

async function removeUserById(id) {
  const res = await User.query().findById(id).delete();
  return res;
}

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  removeUserById,
};
