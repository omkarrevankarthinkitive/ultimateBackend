const {
  RESPONSE_LIMIT_DEFAULT,
} = require("next/dist/server/api-utils/index.js");
const {
  REACT_LOADABLE_MANIFEST,
} = require("next/dist/shared/lib/constants.js");
const { Doctor, validateDoctor } = require("../models/doctorDetailModel.js");

const { User } = require("../models/userModel.js");

//post Doctor

const doctorDetailPost = async (req, res) => {
  try {
    const { error } = validateDoctor(req.body);
    if (error) {
      res.send(error.message);
    }

    const e_email = req.body.email;

    const user = await User.findOne({ e_email });
    if (!user) {
      throw new Error("User does not exists");
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
      workingTime: req.body.workingTime,
      slotDuration: req.body.slotDuration,
      workingDays: req.body.workingDays,
    });

    await newDoctor.save();
    res.status(200).json(newDoctor);
    return;
  } catch (error) {
    res.status(400).send(error.message);
  }
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
    } else {
      res.send([]);
    }
  } catch (error) {
    res.send(error.message);
  }
};

//update Doctor
async function updateDoc(req, res) {
  try {
    const doctorId = req.body.doctorId;
    const slotDuration = req.body.slotDuration;
    const workingDays = req.body.workingDays;
    const workingTime = req.body.workingTime;
    const getAllDoc = await Doctor.findById(doctorId);

    getAllDoc.slotDuration = slotDuration;
    getAllDoc.workingDays = workingDays;
    getAllDoc.workingTime = workingTime;
    getAllDoc = (await getAllDoc.save()) && res.send(getAllDoc);
  } catch (error) {
    res.send(error.message);
  }
}

module.exports = {
  doctorDetailPost,
  doctorSearch,
  docsearchAll,
  updateDoc,
};
