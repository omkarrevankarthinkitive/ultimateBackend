const Jwt = require("jsonwebtoken");

//verify the token
const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
     

    if (token.startsWith("Bearer ")) {
      token = token.slice(7); // remove "Bearer " prefix from token
    }

    console.log(token,"tokeeey")
    

    const decode = Jwt.verify(token, "hello");

    console.log(decode,"dess")

    if (decode) {
      next();
    }
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = verifyToken;
