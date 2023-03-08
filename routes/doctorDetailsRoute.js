const express = require("express");


const {
  doctorDetailPost,
  doctorSearch,
  docsearchAll,
  updateDoc
} = require("../service/doctorDetailcontroller.js");
const verifyToken = require("../utils/verify.js");

const router = express.Router();

router.route("/").post(doctorDetailPost);
router.route("/getdoctorsname").post( doctorSearch);
router.route("/doctorsPage").post( docsearchAll);
router.route("/updatedoc").put(updateDoc)
module.exports = router;
