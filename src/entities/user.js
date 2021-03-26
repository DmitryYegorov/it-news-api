const bcrypt = require("bcryptjs");
const User = require("../models/user");
const PostEntity = require("./post");
const Error404 = require("../middleware/error/error404");
const Error400 = require("../middleware/error/error400");

async function createUser(user) {
  if (await emailExists(user.email)) {
    throw new Error400("You cannot use this email");
  }
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(user.password, salt);
  await User.query().insert({
    ...user,
    password: hash,
  });
}

async function getUserById(id) {
  const result = await User.query().findById(id);
  if (!result) {
    throw new Error404("User not exists");
  }
  return User.query().findById(id);
}

async function getUserByEmail(email) {
  const result = await User.query().where({ email }).first();
  if (!result) {
    throw new Error400("User with this email not exists");
  }
  return result;
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
  await User.query().findById(id).delete();
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

function checkPassword(user, password) {
  if (!bcrypt.compareSync(password, user.password)) {
    throw new Error400("Incorrect password");
  }
  return true;
}

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  removeUserById,
  getUserByEmail,
  checkPassword,
};
