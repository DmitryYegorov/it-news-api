const passport = require("koa-passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const options = {};

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  return User.query()
    .where({ id })
    .first()
    .then((user) => done(null, user))
    .catch((err) => done(err, null));
});
passport.use(
  new LocalStrategy(options, (email, password, done) => {
    User.query()
      .where({ email })
      .first()
      // eslint-disable-next-line consistent-return
      .then((user) => {
        if (!user) {
          return done(null, false);
        }
        if (comparePassword(password, user.password)) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch((err) => done(err));
  })
);

function comparePassword(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}
