const Jwt = require("jsonwebtoken");

//verify the token
const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    const decode = Jwt.verify(token, "hello");

    if (decode) {
      next();
    }
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = verifyToken;
