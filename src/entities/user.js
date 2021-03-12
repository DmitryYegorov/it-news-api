const User = require("../models/user");
const dbSetup = require("../../knex/db-setup");

dbSetup();

async function createUser(user) {
  const newUser = await User.query().insert(user);
  return newUser;
}

module.exports = {
  createUser,
};
