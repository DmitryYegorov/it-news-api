const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const Error404 = require("../middleware/error/error404");
const Error400 = require("../middleware/error/error400");

async function createUser(user) {
  const result = await getUserByEmail(user.email);
  if (result) {
    throw new Error400("You cannot use this email");
  }
  const code = jwt.sign({ email: user.email }, process.env.SECRET, {
    expiresIn: "24h",
  });
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(user.password, salt);
  await User.query().insert({
    ...user,
    activationCode: code,
    password: hash,
  });
  return code;
}

async function getUserById(id) {
  const result = await User.query().findById(id);
  if (!result) {
    throw new Error404("User not exists");
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

async function activateAccount(code) {
  const { email } = jwt.verify(code, process.env.SECRET);
  const result = await User.query().where({ email }).select().first();
  if (!result) {
    throw new Error404("User not exist");
  }
  if (code !== result.activationCode) {
    throw new Error400("Invalid activation link!");
  }
  await User.query().update({ activationCode: null }).findById(result.id);
}

async function getUserByEmail(email) {
  return User.query().where({ email }).select().first();
}

async function resetPassword(id, newPassword, code) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(newPassword, salt);
  const user = await getUserById(id);
  if (code !== user.recoveryPasswordCode) {
    throw new Error400("Invalid link!");
  }
  await User.query()
    .update({ recoveryPasswordCode: null, password: hash })
    .findById(id);
}

async function updatePassword(email, oldPassowrd, newPassword) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(newPassword, salt);
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error400("User with that email not exists!");
  }
  if (!bcrypt.compareSync(oldPassowrd, user.password)) {
    throw new Error400("Incorrect password!");
  }
  await User.query().update({ password: hash }).where({ email });
}

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  activateAccount,
  getUserByEmail,
  resetPassword,
  updatePassword,
};
