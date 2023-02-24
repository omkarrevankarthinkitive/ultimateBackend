const express = require("express");

const {
  PostAppointment,
  getAppointment,
  updateAppoinment,
  aptSearch,
} = require("../controllers/appointmentControler.js");

const verifyToken = require("../utils/verify.js");

const router = express.Router();

router.route("/").post(PostAppointment);
router.route("/get").get(getAppointment);
router.route("/update").put(updateAppoinment);
router.route("/search").post(aptSearch);

module.exports = router;
