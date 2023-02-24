const express = require("express");
const { authUsered, adminRole } = require("../authentication/basicAuth.js");
const Medicalhistorypost = require("../controllers/medicalHistoryController.js");

const router = express.Router();

router.route("/").post(Medicalhistorypost);

module.exports = router;
