const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { check, validationResult } = require("express-validator");

router.get("*", authController.checkIfUser);
router.get("/signout", authController.user_signout_get);
router.get("/", authController.user_welcomePage_get);
router.get("/login", authController.user_loginAuth_get);
router.get("/signup", authController.user_signUp_get);
const arrCheck = 
[
  check("email", "Please provide a valid email").isEmail(),
  check(
    "password",
    "Password must be at least 8 characters with 1 upper case letter and 1 number"
  ).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!"@#\$%\^&\*])(?=.{8,})/),
];
router.post("/signup", arrCheck, authController.user_signUp_post);
router.post("/login", authController.user_login_post);


module.exports = router;