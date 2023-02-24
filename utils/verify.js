const jwt = require("jsonwebtoken");

//verify the token
const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    const decode = Jwt.verify(token, "hello");

    if (decode) {
      next();
    } else {
      res.send({ val: false });
    }
  } catch (error) {
    res.send({ val: false });
  }
};

module.exports = verifyToken;
