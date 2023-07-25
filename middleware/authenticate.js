const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  console.log("first");
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, "verySecretValue");

    console.log("second");

    req.user = decode;

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
