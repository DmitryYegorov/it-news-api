const User = require("../models/user");
const ErrorService = require("../middleware/error/errorService");

async function createUser(user) {
  const result = await User.query()
    .where({
      email: user.email,
    })
    .select()
    .count();
  if (!result) {
    throw ErrorService.errorThrow(400);
  }
  User.query().insert(user);
}

async function getUserById(id) {
  const result = await User.query().findById(id);
  if (!result) {
    throw ErrorService.errorThrow(400);
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
  const name = data.name || result.name;
  const email = data.email || result.email;
  await User.query().update({ name, email }).findById(id);
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
