const User = require("../models/user");
const ErrorService = require("../middleware/error/errorService");

async function createUser(user) {
  return User.query().insert(user);
}

async function getUserById(id) {
  const result = await User.query().findById(id);
  if (!result) {
    throw ErrorService.errorThrow(404);
  }
  return User.query().findById(id);
}

async function getAllUsers() {
  return User.query().select();
}

async function updateUser(id, data) {
  const result = await User.query().findById(id);
  if (!result) {
    throw ErrorService.errorThrow(404);
  }
  User.query().update(data).findById(id);
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
