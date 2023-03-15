const Jwt = require("jsonwebtoken");

//verify the token
const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (token.startsWith("Bearer ")) {
      token = token.slice(7);
    }

    const decode = Jwt.verify(token, "hello");

    if (decode) {
      next();
    }
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = verifyToken;
