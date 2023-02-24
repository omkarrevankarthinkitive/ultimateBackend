const { User } = require("../models/userModel");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const { validateUser } = require("../models/userModel");
const Jwt = require("jsonwebtoken");

//authenticate user (login)
const authUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body, "xyz");
  const user = await User.findOne({ email });
  if (!user) return res.status(401).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(402).send("Invalid email or password.");

  var payload;
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
};

//register user ( SignUp)
const registerUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    res.send(error.message);
    return;
  }

  const { name, email, password, role } = req.body;

  let userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).send("User already exists");
    return "already exists";
  }

  userExists = new User(
    _.pick(req.body, ["name", "email", "password", "role", "phoneNumber"])
  );

  const salt = await bcrypt.genSalt(10);

  userExists.password = await bcrypt.hash(userExists.password, salt);

  await userExists.save();

  res.status(201).send(userExists);
};

//change password
const requestPasswordReset = async (req, res) => {
  const { email, oldPass, newPass } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).send("User does not exist");
  }

  const validPassword = await bcrypt.compare(oldPass, user.password);

  if (!validPassword) {
    res.status(400).send("The Old password u have given is wrong");
    return;
  }

  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(newPass, salt);
  await user.save();
  res.send("updated Successfully");

  return;
};

module.exports = {
  authUser,
  registerUser,
  requestPasswordReset,
};
