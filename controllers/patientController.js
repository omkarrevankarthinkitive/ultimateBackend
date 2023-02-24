const { Patient, validatePatient } = require("../models/patientModel.js");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken.js");

const { User } = require("../models/userModel.js");

//post user

const patientpost = async (req, res) => {
  const { error } = validatePatient(req.body);
  if (error) {
    res.send(error.message);
  }

  const thisEmail = req.body.email;

  const user = await User.findOne({ thisEmail });
  if (!user) {
    res.status(400).send("User does not exist");
  }
  const patient = new Patient({
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    dob: req.body.dob,
    gender: req.body.gender,
    maritialStatus: req.body.maritialStatus,
    fatherName: req.body.fatherName,
    education: req.body.education,
    occupation: req.body.occupation,
    Nationality: req.body.Nationality,
    motherTongue: req.body.motherTongue,
    email: user,
    address: req.body.address,
    state: req.body.state,
    country: req.body.country,
    city: req.body.city,
    pinCode: req.body.pinCode,
  });

  await patient.save();
  res.json(patient);
  return;
};
module.exports = patientpost;
