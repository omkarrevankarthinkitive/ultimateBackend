const mongoose = require("mongoose");
const Joi = require("joi");
const patientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Others"],
    required: true,
  },
  maritialStatus: {
    type: String,
    enum: ["Unmarried", "Married", "Widower", "Divorced", "Seperated", "Widow"],
  },
  fatherName: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    enum: [
      "Nil",
      "Primary",
      "Secondary",
      "Technical",
      "Graduation",
      "Post Graduation",
      "Others",
    ],
    required: true,
  },
  occupation: {
    type: String,
    enum: [
      "Business",
      "House Wife",
      "Service",
      "Pensioner",
      "Retired",
      "Student",
      "Agriculture",
      "Unemployed",
      "Unknown",
      "Others",
    ],
    required: true,
  },
  Nationality: {
    type: String,
    enum: ["Indian", "Foreign"],
    required: true,
  },
  motherTongue: {
    type: String,
    enum: [
      "Assamese",
      "Bengali",
      "English",
      "Gujrati",
      "Hindi",
      "Kannada",
      "Kashmiri",
      "Konkani",
      "Malayalam",
      "Marathi",
      "Marwari",
      "Nepali",
      "Oriya",
      "Others",
      "Punjabi",
      "Rajasthani",
      "Sanskrit",
      "Sindhi",
      "Tamil",
      "Telugu",
      "Tulu",
      "Unknown",
      "Urdu",
    ],
  },
  email: {
    type: String,
    required: true,
    ref: "User",
  },
  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pinCode: {
    type: Number,
    required: true,
  },
});

const Patient = mongoose.model("Patient", patientSchema);

function validatePatient(user) {
  const validationSchema = Joi.object({
    firstName: Joi.string().min(5).max(50).required(),
    middleName: Joi.string(),
    lastName: Joi.string(),
    dob: Joi.string().required(),
    gender: Joi.string().required(),
    maritialStatus: Joi.string().required(),
    fatherName: Joi.string().required(),
    education: Joi.string().required(),
    occupation: Joi.string().required(),
    Nationality: Joi.string().required(),
    motherTongue: Joi.string().required(),
    email: Joi.string().required(),
    address: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    pinCode: Joi.number().required(),
  });
  return validationSchema.validate(user);
}

module.exports = { Patient, validatePatient };
