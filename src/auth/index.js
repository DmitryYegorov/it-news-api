const passport = require("koa-passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../entities/user");
const Error400 = require("../middleware/error/error400");

const options = {
  usernameField: "email",
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.getUserById(id);
    if (user) {
      done(null, user);
    }
  } catch (e) {
    done(e);
  }
});
passport.use(
  new LocalStrategy(options, async (email, password, done) => {
    const user = await User.getUserByEmail(email);
    if (!user) {
      return done(null, false);
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error400("Incorrect password");
    } else {
      return done(null, user);
    }
  })
);
