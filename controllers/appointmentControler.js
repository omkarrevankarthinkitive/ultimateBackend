const { Appointment } = require("../models/appointmentModel.js");

//post an appointment week
const postAppointment = async (req, res) => {
  try {
    const newAppointment = new Appointment({
      reason: req.body.reason,
      location: req.body.location,
      room: req.body.room,
      diagnosis: req.body.diagnosis,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dob: req.body.dob,
      gender: req.body.gender,
      cellPhone: req.body.cellPhone,
      homePhone: req.body.homePhone,
      email: req.body.email,
      address: req.body.address,
      Province: req.body.Province,
      city: req.body.city,
      postalCode: req.body.postalCode,
      aptTime: req.body.aptTime,
      aptDate: req.body.aptDate,
    }); 

    await newAppointment.save();
    
    res.status(200).send(newAppointment);
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
