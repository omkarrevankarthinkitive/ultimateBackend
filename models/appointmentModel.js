const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema({
  reason: {
    type: String,
  },
  location: {
    Type: String,
  },
  room: {
    type: Number,
  },
  diagnosis: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  dob: {
    Type: String,
  },
  gender: {
    type: String,
  },
  cellPhone: {
    type: Number,
  },
  homePhone: {
    type: Number,
  },
  email: {
    type: String,
  },
  address: {
    Type: String,
  },
  Province: {
    type: String,
  },
  city: {
    type: String,
  },
  postalCode: {
    type: String,
  },
  aptTime: {
    type: String,
  },
  aptDate: {
    type: String,
  },
});

const Appointment = mongoose.model("Appiontment", appointmentSchema);

module.exports = { Appointment, appointmentSchema };
