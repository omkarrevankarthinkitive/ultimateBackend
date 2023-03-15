const express = require("express");

const {
  doctorDetailPost,
  doctorSearch,
  docsearchAll,
  updateDoc,
} = require("../service/doctorDetailcontroller.js");
const verifyToken = require("../utils/verify.js");

const router = express.Router();

//POST A NEW DOCTOR
router.route("/").post(doctorDetailPost);

//DOCTOR SEARCH FOR SEARCHBAR LIMIT UPTO 5
router.route("/getdoctorsname").get(doctorSearch);
// DOCTOR SEARCH BY ID
router.route("/doctorsPage").get(docsearchAll);
//TO UPDATE THE DOCTOR
router.route("/updatedoc").put(updateDoc);

module.exports = router;
