const {Doctor,validateDoctor} = require("../models/doctorDetailModel.js");

const { User } = require("../models/userModel.js");

//post Doctor

const doctorDetailPost = async (req, res) => {
  const { error } = validateDoctor(req.body);
  if (error) {
    res.send(error.message);
  }

  const e_email = req.body.email;

  const user = await User.findOne({ e_email });
  if (!user) {
    res.status(400).send("User does not exist");
  }
  const newDoctor = new Doctor({
    doctorName: req.body.doctorName,
    userId: req.body.userId,
    qualification: req.body.qualification,
    gender: req.body.Gender,
    clinicName: req.body.clinicName,
    phoneNumber: req.body.phoneNumber, 
    streetAddress: req.body.streetAddress,
    city: req.body.city,
    state: req.body.state,
    pinCode: req.body.pinCode,
    aboutMyself: req.body.aboutMyself,
    img: req.body.img,
  });

  await newDoctor.save();
  res.status(200).json(newDoctor);
  return;
};

//doctor search by id
const docsearchAll = async (req, res) => {
  try {
    const theid = req.query.id;
    const doctorID = await Doctor.findById(theid);
    res.send(doctorID);
  } catch (error) {
    res.send([]);
  }
};

//search doctor

const doctorSearch = async (req, res) => {
  try {
    const body = req.query.searchField;

    const getDoctorsName = await Doctor.find(
      { doctorName: { $regex: `${body}` } },
      { doctorName: 1, _id: 1, img: 1 }
    ).limit(5);

    if (getDoctorsName) {
      res.status(200).send(getDoctorsName);
    }
  } catch (error) {
    res.send([]);
  }
};

module.exports = {
  doctorDetailPost,
  doctorSearch,
  docsearchAll,
};
