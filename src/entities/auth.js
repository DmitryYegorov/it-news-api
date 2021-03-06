const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/user");
const UserEntity = require("./user");
const Error400 = require("../middleware/error/error400");
const Error404 = require("../middleware/error/error404");

const { JwtExp, SECRET } = process.env;

async function resetPassword(user) {
  const code = jwt.sign(
    { id: user.id, email: user.email },
    process.env.SECRET,
    {
      expiresIn: "24h",
    }
  );
  await UserModel.query()
    .update({ recoveryPasswordCode: code })
    .findById(user.id);
  return code;
}

async function createUser(user) {
  const result = await UserEntity.getUserByEmail(user.email);
  if (result) {
    throw new Error400("You cannot use this email");
  }
  const code = jwt.sign({ name: user.name, email: user.email }, SECRET, {
    expiresIn: JwtExp,
  });
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(user.password, salt);
  await UserModel.query().insert({
    ...user,
    activationCode: code,
    password: hash,
  });
  return code;
}

async function activateAccount(code) {
  let email = "";
  try {
    email = jwt.verify(code, process.env.SECRET).email;
  } catch (e) {
    throw new Error400("Invalid link!");
  }
  const result = await UserModel.query().where({ email }).select().first();
  if (!result) {
    throw new Error404("User not exist");
  }
  if (code !== result.activationCode) {
    throw new Error400("Invalid activation link!");
  }
  await UserModel.query().update({ activationCode: null }).findById(result.id);
}

async function updatePassword(email, oldPassowrd, newPassword) {
  const user = await UserEntity.getUserByEmail(email);
  if (!user) {
    throw new Error400("User with that email not exists!");
  }
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(newPassword, salt);
  if (!bcrypt.compareSync(oldPassowrd, user.password)) {
    throw new Error400("Incorrect password!");
  }
  await UserModel.query().update({ password: hash }).where({ email });
}

async function recoveryPassword(newPassword, code) {
  let email = "";
  try {
    email = jwt.verify(code, SECRET).email;
  } catch (e) {
    throw new Error400("Invalid link!");
  }
  const user = await UserEntity.getUserByEmail(email);
  if (code !== user.recoveryPasswordCode) {
    throw new Error400("Invalid link!");
  }
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(newPassword, salt);
  await UserModel.query()
    .update({ recoveryPasswordCode: null, password: hash })
    .findById(user.id);
}

module.exports = {
  resetPassword,
  createUser,
  activateAccount,
  updatePassword,
  recoveryPassword,
  getUserByEmail: UserEntity.getUserByEmail,
};
