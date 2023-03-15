const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Joi = require("joi");

const scheduleSchema = Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },

  startTime: {
    type: Date,
    required: true,
  },

  endTime: {
    type: Date,
    required: true,
  },
});

const Schedular = mongoose.model("Schedular", scheduleSchema);

function validateSchedule(schedular) {
  const schema = Joi.object({
    doctorId: Joi.string(),
    startDate: Joi.string(),
    endDate: Joi.string(),
  });

  return schema.validate(schedular);
}
module.exports = { Schedular, validateSchedule };
