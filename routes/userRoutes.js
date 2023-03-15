const express = require("express");
const {
  registerUser,
  authUser,
  requestPasswordReset,
} = require("../service/userController.js");
const verifyToken = require("../utils/verify.js");

const router = express.Router();

//TO REGISTER A USER
router.route("/").post(registerUser);

//TO LOGIN THE USER
router.route("/login").post(authUser);

//TO RESET PASSWORD
router.post("/newpass", verifyToken, requestPasswordReset);

//TO VERIFY TOKEN
router.post("/verify", verifyToken);

module.exports = router;
