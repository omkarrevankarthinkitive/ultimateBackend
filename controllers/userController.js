const { User } = require("../models/userModel");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const { validateUser } = require("../models/userModel");
const Jwt = require("jsonwebtoken");
const { reverse } = require("lodash");

//authenticate user (login)
const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid password or email");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      throw new Error("Invalid password or email");
    }

    var payload;
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(401).send(error.message);
  }
};

//register user ( SignUp)
const registerUser = async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) {
      res.send(error.message);
      return;
    }

    const { name, email, password } = req.body;

    let userExists = await User.findOne({ email });

    if (userExists) {
      throw new Error("User Already exits");
    }

    userExists = new User(
      _.pick(req.body, ["name", "email", "password", "phoneNumber"])
    );

    const salt = await bcrypt.genSalt(10);

    userExists.password = await bcrypt.hash(userExists.password, salt);

    await userExists.save();

    res.status(201).send(userExists);
  } catch (error) {
    res.status(401).send(error.message);
  }
};

//change password
const requestPasswordReset = async (req, res) => {
  try {
    const { email, oldPass, newPass } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User does not exist");
    }

    const validPassword = await bcrypt.compare(oldPass, user.password);

    if (!validPassword) {
      throw new Error("Invalid Password");
    }

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(newPass, salt);
    await user.save();
    res.send("updated Successfully");
  } catch (error) {
    res.status(401).send(error.message);
  }
};

module.exports = {
  authUser,
  registerUser,
  requestPasswordReset,
};
