const mongoose = require("mongoose");
const Joi = require("joi");

const appointmentSchema = new mongoose.Schema({
  doctorId: {
    type: String,
  },
  patientFirstName: {
    type: String,
  },
  patientLastName: {
    type: String,
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
  date: {
    type: String,
  },
  reason: {
    type: String,
  },
});

const Appointment = mongoose.model("Appiontment", appointmentSchema);

function validateApt(appointment) {
  const schema = Joi.object({
    doctorId: Joi.string(),
    patientFirstName: Joi.string(),
    patientLastName: Joi.string(),
    startTime: Joi.string(),
    endTime: Joi.string(),
    date: Joi.string(),
    reason: Joi.string(),
  });
  return schema.validate(appointment);
}
module.exports = { Appointment, validateApt };
