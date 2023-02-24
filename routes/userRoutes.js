const express = require("express");
const {
  registerUser,
  authUser,
  requestPasswordReset,
} = require("../controllers/userController.js");
const verifyToken = require("../utils/verify.js");

const router = express.Router();

router.route("/").post(registerUser);

router.route("/login").post(authUser);
router.post("/login", authUser);
router.post("/newpass", verifyToken, requestPasswordReset);
router.post("/verify", verifyToken);

module.exports = router;
