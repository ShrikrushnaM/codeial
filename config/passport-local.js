const passport = require("passport");

const localStrategy = require("passport-local").Strategy;

const User = require("../models/user");

//authentication using passport
passport.use(
  new localStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      User.findOne({ email: email })
        .then((user) => {
          if (!user || user.password != password) {
            console.log("Invalid Username/password");
            return done(null, false);
          }
          return done(null, user);
        })
        .catch((err) => {
          console.log("Error in finding user --- > passport");
          return done(err);
        });
    }
  )
);

//serializing the user to decide which key is to be kept in the cookies

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
    .catch((err) => {
      console.log("Error in finding user --> passport");
      return done(err);
    })
    .then((user) => {
      return done(null, user);
    });
});

passport.checkAuthentication = function (req, res, next) {
  // if the user is signed in thenpass on the request to the next function(controller's action)
  if (req.isAuthenticated()) {
    return next();
  }
  //if the user is not signed in
  return res.redirect("users/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }

  next();
};

module.exports = passport;
