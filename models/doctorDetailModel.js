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
  Gender: {
    type: String,
    required: true,
  },
  clinicName: {
    type: String,
    required: true,
  },
  email: {
    type: Object,
    required: true,
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
  clinicAddress: {
    type: new mongoose.Schema({
      streetAddress: {
        type: String,
        required: true,
      },
      streetAddress2: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pinCode: {
        type: String,
        required: true,
      },
    }),
  },
  aboutMyself: {
    type: String,
    required: true,
  },
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
  });

  return schema.validate(doctor);
}

module.exports = Doctor;
