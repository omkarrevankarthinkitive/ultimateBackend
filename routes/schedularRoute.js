const express = require("express");
const router = express.Router();
const { createAppointment } = require("../service/schedularController");

// .../appointments
router.route("/").post(createAppointment);

// Export the router
module.exports = router;
