// user schema => datavase
const userModel = require("../models/AuthUser");
// for encrypt the password
const bcrypt = require("bcrypt");
// for token
var jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

// check if the user has a token
const checkIfUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_PRIVATE_KEY, async (err, decoded) => {
      if (err) {
        res.locals.userStatus = null;
        next();
      } else {
        const currentUser = await userModel.findById(decoded.id);
        res.locals.userStatus = currentUser;
        next();
      }
    });
  } else {
    res.locals.userStatus = null;
    next();
  }
};

// GET request
const user_signout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
const user_welcomePage_get = (req, res) => {
  res.render("welcome");
};
const user_loginAuth_get = (req, res) => {
  res.render("auth/login");
};
const user_signUp_get = (req, res) => {
  res.render("auth/signup");
};

// POST request 
const user_signUp_post = async (req, res) => {
  console.log(req.body);
  try {
    // check validation username and password
    const objError = validationResult(req);
    console.log(objError.errors);
    if (objError.errors.length > 0) {
      return res.json({ invalidInput: objError.errors });
    }
    // check if the email already exist
    const isCurrentEmail = await userModel.findOne({ email: req.body.email });
    if (isCurrentEmail) {
      return res.json({ EmailIsExist: "Email already exist" });
    }
    // create new user and login
    const newUser = await userModel.create(req.body);
    var token = jwt.sign({ id: newUser._id }, process.env.JWT_PRIVATE_KEY);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
    res.json({ id: newUser._id });
  } catch (error) {
    console.log(error);
  }
};
const user_login_post = async (req, res) => {
  console.log("__________________________________________");
  try {
    const loginUser = await userModel.findOne({ email: req.body.email });
    console.log(loginUser);

    if (loginUser == null) {
      res.json({ notFoundEmail: "this email not found in DATABASE" });
    } else {
      const match = await bcrypt.compare(req.body.password, loginUser.password);
      if (match) {
        var token = jwt.sign({ id: loginUser._id }, process.env.JWT_PRIVATE_KEY);
        res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
        res.json({ id: loginUser._id });
      } else {
        res.json({ invaildPass: "wrong password" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  checkIfUser,
  user_signout_get,
  user_welcomePage_get,
  user_loginAuth_get,
  user_signUp_get,
  user_signUp_post,
  user_login_post,
};
