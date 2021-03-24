const User = require("../models/user");
const Error404 = require("../middleware/error/error404");
const Error400 = require("../middleware/error/error400");

async function createUser(user) {
  const result = await User.query()
    .where({
      email: user.email,
    })
    .select()
    .count();
  if (result) {
    throw new Error400("User with that email already exists");
  }
  User.query().insert(user);
}

async function getUserById(id) {
  const result = await User.query().findById(id);
  if (!result) {
    throw new Error404();
  }
  return User.query().findById(id);
}

async function getAllUsers() {
  return User.query().select();
}

async function updateUser(id, data) {
  const result = await User.query().findById(id);
  if (!result) {
    throw new Error404();
  }
  const name = data.name || result.name;
  const email = data.email || result.email;
  await User.query().update({ name, email }).findById(id);
}

async function removeUserById(id) {
  const result = await User.query().findById(id);
  if (!result) {
    throw new Error404();
  }
  return User.query().findById(id).delete();
}

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  removeUserById,
};
