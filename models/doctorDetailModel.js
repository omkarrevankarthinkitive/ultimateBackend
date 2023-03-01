const mongoose = require("mongoose");

const Joi = require("joi");

const doctorSchema = new mongoose.Schema({
  doctorName: {
    type: String,
    required: true,
  },
  qualification: {
    type: [String],
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  clinicName: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
  
    ref: "User",
  },
  img: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: String,
    required: true,
  },
  aboutMyself: {
    type: String,
    required: true,
  },
  appointmentId:{
    type:[String]
  }
});

const Doctor = mongoose.model("Doctor", doctorSchema);

function validateDoctor(doctor) {
  const schema = Joi.object({
    doctorName: Joi.string().max(50).required(),
    qualification: Joi.string(),
    Gender: Joi.string(),
    phoneNumber: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
      clinicName: Joi.string(),
      userId: Joi.string(),
      aboutMyself: Joi.string(),
      img: Joi.string(),
      


  });

  return schema.validate(doctor);
}

module.exports = {Doctor,validateDoctor};
