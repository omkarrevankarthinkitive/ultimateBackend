const express = require("express");
const router = express.Router();
const { getSlot} = require("../service/schedularController");

// TO GET APPOINTMENT SLOTS
router.route("/getslot").get(getSlot)



// Export the router
module.exports = router;
 