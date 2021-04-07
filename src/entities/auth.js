const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

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

module.exports = {
  resetPassword,
};
