const express = require("express");

const {
  postAppointment,
  getAppointment,
  aptSearch,
} = require("../controllers/appointmentControler.js");

const verifyToken = require("../utils/verify.js");

const router = express.Router();

router.route("/").post(postAppointment);
router.route("/get").get(getAppointment);
router.route("/").get(aptSearch);

module.exports = router;
