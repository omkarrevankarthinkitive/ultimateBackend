const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = Schema({
  doctor: {
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
module.exports = Schedular;
