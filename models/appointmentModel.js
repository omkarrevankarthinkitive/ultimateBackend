const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema({
  reason: {
    type: String,
  },
  location: {
    Type: String,
  },
  room: {
    type: String,
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
    type: String,
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
  province: {
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
 