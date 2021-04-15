const passport = require("koa-passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Error400 = require("../middleware/error/error400");

const options = {
  usernameField: "email",
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.query().where({ id }).first();
    if (user) {
      done(null, user);
    }
  } catch (e) {
    done(e);
  }
});
passport.use(
  new LocalStrategy(options, async (email, password, done) => {
    User.query()
      .where({ email })
      .first()
      .then((user) => {
        if (!user) {
          done(new Error400("User not exists"), false);
        }
        if (bcrypt.compareSync(password, user.password)) {
          done(null, user);
        } else {
          done(new Error400("Incorrect password"), false);
        }
      });
  })
);
