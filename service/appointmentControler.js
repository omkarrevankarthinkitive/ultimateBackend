const { Appointment, validateApt } = require("../models/appointmentModel.js");

//post an appointment week
const postAppointment = async (req, res) => {
  try {
    const { error } = validateApt(req.body);
    if (error) {
      res.send(error.message);
    }

    const newAppointment = new Appointment({
      doctorId: req.body.doctorId,
      patientFirstName: req.body.patientFirstName,
      patientLastName: req.body.patientLastName,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      reason: req.body.reason,
      date: req.body.date,
    });

    await newAppointment.save();

    res.status(200).send(newAppointment);
    if (!newAppointment) {
      throw new Error("appointment set to failed");
    }
  } catch (error) {
    res.send("error", error.message);
  }
};

//search appointment
const aptSearch = async (req, res) => {
  try {
    const body = req.query.search;

    if (!body) {
      throw new Error("type something to get result");
    }

    const aptName = await Appointment.find(
      { firstName: { $regex: `${body}` } },
      {
        firstName: 1,
        lastName: 1,
        aptTime: 1,
        aptDate: 1,
        city: 1,
        room: 1,
        diagnosis: 1,
        reason: 1,
      }
    ).limit(10);

    return res.status(200).send(aptName);
  } catch (error) {
    res.status(400).send([]);
  }
};

//get the appointment list

const getAppointment = async (req, res) => {
  try {
    const getAppoint = await Appointment.find();

    res.send(getAppoint);
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  postAppointment,
  getAppointment,
  aptSearch,
};
