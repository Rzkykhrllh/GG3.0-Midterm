const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new Error("You are not logged in");

    const token = req.headers.authorization.split(" ")[1];

    if (!token) throw new Error("You are not logged in");

    const decode = await jwt.verify(token, process.env.SECRET_KEY);

    const userData = await User.findOne({ email: decode.name });

    req.userData = userData;

    next();
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      res.status(401).json({
        message: `Token Expired`,
      });
    } else if (error.message == "You are not logged in") {
      res.json({
        message: "You are not logged in, please login to access this feature",
      });
    }
    res.json({
      message: `Failed to authenticate ${error}`,
    });
  }
};

module.exports = { authenticate };
