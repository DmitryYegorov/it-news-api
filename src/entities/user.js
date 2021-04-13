const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const Error404 = require("../middleware/error/error404");
const Error400 = require("../middleware/error/error400");

const { SECRET } = process.env;

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
    if (key === "email") {
      // eslint-disable-next-line no-await-in-loop
      if (await getUserByEmail(result.email)) {
        throw new Error400("You cannot use this email");
      }
    }
  }
  const name = data.name || result.name;
  const email = data.email || result.email;
  await User.query().update({ name, email }).findById(id);
}

async function getUserByEmail(email) {
  return User.query().where({ email }).select().first();
}

async function resetPassword(newPassword, code) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(newPassword, salt);
  const { email } = await jwt.decode(code, SECRET);
  const user = await getUserByEmail(email);
  if (code !== user.recoveryPasswordCode) {
    throw new Error400("Invalid link!");
  }
  await User.query()
    .update({ recoveryPasswordCode: null, password: hash })
    .findById(user.id);
}

async function removeUserById(id) {
  const user = await getUserById(id);
  if (!user) {
    throw new Error400("User not exists");
  }
  await User.query().findById(id).delete();
}

module.exports = {
  getUserById,
  getAllUsers,
  updateUser,
  getUserByEmail,
  resetPassword,
  removeUserById,
};
