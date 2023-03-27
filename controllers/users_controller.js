const User = require("../models/user");

module.exports.profile = function (req, res) {
  return res.render("userProfile", {
    title: "User Profile",
  });
};

//
module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "Codial | Sign Up",
  });
};

module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "Codial | Sign In",
  });
};

module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      console.log(req.body);
      User.create(req.body)
      .catch((err) => {
        console.log("Error in creating a user", err);
        return;
      });
    } else {
      return res.redirect("back");
    }

    return res.redirect("/users/sign-in");
  });

  // , (err, user) => {
  //   if (!user) {
  //     User.create(req.body, (err, user) => {
  //       if (err) {
  //         console.log("Error in creating a user");
  //         return;
  //       }
  //     });
  //   } else {
  //     return res.redirect("back");
  //   }
  // });
};

module.exports.createSession = function (req, res) {
  // TODO later
};
