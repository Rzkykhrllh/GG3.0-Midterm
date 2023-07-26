const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = await jwt.verify(token, process.env.SECRET_KEY);

    const userData = await User.findOne({ email: decode.name });

    req.userData = userData;

    next();
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      res.status(401).json({
        message: `Token Expired`,
      });
    }
    res.json({
      message: `Failed to authenticate ${error}`,
    });
  }
};

module.exports = { authenticate };
