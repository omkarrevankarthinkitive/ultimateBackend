const mongoose = require("mongoose");

const Joi = require("joi");

const medicalHistorySchema = new mongoose.Schema({
  pastIllness: {
    type: [String],
    required: true,
  },

  email: {
    type: String,
    required: true,
    ref: "User",
  },

  operations: [
    {
      type: new mongoose.Schema({
        operationName: {
          type: String,
        },
        operationDate: {
          type: Array,
          default: Date,
        },
        hospitalName: {
          type: String,
        },
      }),
    },
  ],
});

const Medicalhistory = mongoose.model("Medicalhistory", medicalHistorySchema);

function validateUser(user) {
  const schema = Joi.object({
    pastIllness: Joi.array().required(),
    operations: Joi.object().required(),
    familyHistory: Joi.object().required(),
  });

  return schema.validate(user);
}

module.exports = { Medicalhistory, validateUser };
