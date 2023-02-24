const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "hello", {
    expiresIn: "24h",
  });
};
module.exports = generateToken;
