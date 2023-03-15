const express = require("express");

const {
  postAppointment,
  getAppointment,
  aptSearch,
} = require("../service/appointmentControler.js");

//To verify the Token
const verifyToken = require("../utils/verify.js");

const router = express.Router();

//POST APPOINTMENTS
router.route("/").post(postAppointment);

//GET APPOINTMENTS
router.route("/get").get(getAppointment);

//APPOINTMENT SEARCH
router.route("/").get(aptSearch);

module.exports = router;
