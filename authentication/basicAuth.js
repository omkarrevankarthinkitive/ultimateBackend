
const { User } = require("../models/userModel.js");
function authUsered(req, res, next) {
  if (req.body == null) {
    res.status(401);
    return res.send("you need to sign in");
  }

  next();
}

function adminRole() {
  return async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.send("Oops,we dont have you in our registery plz regsiter first ");
    }
    if (user.role !== "Admin") {
      res.status(401);
      return res.send("only admin can do this task");
    }
    next();
    return;
  };
}

function PatientRole() {
  return async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.send("Oops,we dont have you in our registery plz regsiter first ");
    }
    if (user.role !== "Patient") {
      res.status(401);
      return res.send("only Patient can do this task");
    }
    next();
    return;
  };
}

function DoctorRole() {
  return async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.send("Oops,we dont have you in our registery plz regsiter first ");
      return;
    }
    if (user.role !== "Doctor") {
      res.status(401);
      return res.send("only Doctor can do this task");
    }
    next();
    return;
  };
}

module.exports = {
  authUsered,
  adminRole,
  PatientRole,
  DoctorRole,
};
