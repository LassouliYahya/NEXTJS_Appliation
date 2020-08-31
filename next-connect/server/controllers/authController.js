const mongoose = require("mongoose");
const User = mongoose.model("User");
const passport = require("passport");

exports.validateSignup = (req, res, next) => {
  req.sanitizeBody("name");
  req.sanitizeBody("email");
  req.sanitizeBody("password");

  req.checkBody("name", "Entre Your Name").notEmpty();
  req
    .checkBody("name", "Name must be between 4 and 10 characters")
    .isLength({ min: 4, max: 10 });

  req.checkBody("email", "Entre a valid Email").isEmail().normalizeEmail();

  req.checkBody("password", "Entre Your password").notEmpty();
  req
    .checkBody("password", "password must min 4  characters")
    .isLength({ min: 4 });
  const errors = req.validationErrors();
  if (errors) {
    const firstErrors = errors.map((error) => error.msg)[0];
    return res.status(400).send(firstErrors);
  } else {
    next();
  }
};

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await new User({ name, email, password });
  await User.register(user, password, (err, user) => {
    if (err) {
      return res.status(500).send(err.message);
    } else {
      res.json(user.name);//mabghinach data d user kamlo ila name
    }
  });
};

exports.signin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).send(err.message); //json
    } 
    else if (!user) {
      return res.status(400).send(info.message); //json
    } 
    else {
      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).send(err.message);
        } else {
          res.json(user);
        }
      });
    }
  })(req,res,next);
};

exports.signout = (req,res) => {
res.clearCookie("next-cookie.sid")
req.logout()
res.json("You are Now Signed Out !");
};

exports.checkAuth = (req,res,next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
         res.redirect('/signin');
    }
};
