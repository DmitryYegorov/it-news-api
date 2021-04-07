const jwt = require("jsonwebtoken");
const User = require("./user");
const UserModel = require("../models/user");
const Error400 = require("../middleware/error/error400");

async function resetPassword(email) {
  const user = User.getUserByEmail(email);
  if (!user) {
    throw new Error400("User with that email not exists!");
  }
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

module.exports = {
  resetPassword,
};
