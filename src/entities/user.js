const User = require("../models/user");

const Error404 = require("../middleware/error/error404");
const Error400 = require("../middleware/error/error400");

async function getUserById(id) {
  const result = await User.query().findById(id);
  if (!result) {
    throw new Error400("User not exists");
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
  // eslint-disable-next-line no-restricted-syntax
  for (const key of Object.keys(data)) {
    if (!data[key].trim()) {
      throw new Error400("You cannot send empty data");
    }
  }
  const name = data.name || result.name;
  const email = data.email || result.email;
  try {
    await User.query().update({ name, email }).findById(id);
  } catch (e) {
    throw new Error400("This email already use!");
  }
}

async function getUserByEmail(email) {
  return User.query().where({ email }).select().first();
}

async function removeUserById(id) {
  const user = await getUserById(id);
  if (!user) {
    throw new Error400("User not exists");
  }
  await User.query().findById(id).delete();
}

async function getByPages(limit, page) {
  if (!page || !limit) {
    throw new Error400("Invalid data sent!");
  }
  return User.query()
    .offset((page - 1) * limit)
    .limit(limit)
    .select();
}

module.exports = {
  getUserById,
  getAllUsers,
  updateUser,
  getUserByEmail,
  removeUserById,
  getByPages,
};
