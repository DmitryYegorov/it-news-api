const User = require("../models/user");
const PostEntity = require("./post");
const Error404 = require("../middleware/error/error404");
const Error400 = require("../middleware/error/error400");

async function createUser(user) {
  if (await emailExists(user.email)) {
    throw new Error400("You cannot use this email");
  }
  await User.query().insert(user);
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
  // eslint-disable-next-line no-restricted-syntax
  for (const key of Object.keys(data)) {
    if (!data[key].trim()) {
      throw new Error400("You cannot send empty data");
    }
    if (key === "email") {
      // eslint-disable-next-line no-await-in-loop
      if (await emailExists(data.email)) {
        throw new Error400("You cannot use this email");
      }
    }
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
  await PostEntity.removePostsByAuthor(id);
  User.query().findById(id).delete();
}

async function emailExists(email) {
  const result = await User.query()
    .where({
      email,
    })
    .select()
    .first();
  return !!result;
}

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  removeUserById,
};
