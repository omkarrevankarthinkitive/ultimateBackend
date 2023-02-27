const express = require("express");
const patientPost = require("../controllers/patientController.js");
const verifyToken = require("../utils/verify.js");
const router = express.Router();

router.route("/patientDetail").post(verifyToken, patientPost);

module.exports = router;
