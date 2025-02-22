const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Local strategy for username/password authentication
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', // Use 'email' instead of 'username'
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        // Find the user by email
        const user = await User.findOne({ email });

        // If user not found or password is incorrect
        if (!user || !(await bcrypt.compare(password, user.password))) {
          return done(null, false, { message: 'Incorrect email or password' });
        }

        // Authentication successful
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Middleware to initialize Passport
const initializePassport = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
};

module.exports = {
  initializePassport,
  passport,
};
