const { Appointment } = require("../models/appointmentModel.js");

//post an appointment week
const PostAppointment = async (req, res) => {
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
    return newAppointment;
    res.send(newAppointment);
  } catch (error) {
    res.status(400).send("error", error.message);
  }
};

//search appointment
const aptSearch = async (req, res) => {
  try {
    const bodyIn = req.body.searchField;

    if (!bodyIn) {
      throw new Error();
    }

    const aptName = await Appointment.find(
      { firstName: { $regex: `${bodyIn}` } },
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

//update appointment list
const updateAppoinment = async (req, res) => {
  try {
    const id = "63beb9c781b7d927f3e155d5";
    const getAppoint = await Appointment.findById(id);

    getAppoint.fields = req.body.fields;
    const updateSave = await getAppoint.save();
    res.send(updateSave);
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  PostAppointment,
  getAppointment,
  updateAppoinment,
  aptSearch,
};
