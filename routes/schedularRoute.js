const express = require("express");
const router = express.Router();
const { createAppointment,receiveAppointment ,getSlot} = require("../service/schedularController");

// .../appointments
router.route("/").post(createAppointment);
router.route("/recieved").get(receiveAppointment)
router.route("/getslot").get(getSlot)



// Export the router
module.exports = router;
