const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (error, hashedPasswrod) => {
    if (error) {
      res.json({ error: err });
    }

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPasswrod,
    });

    newUser
      .save()
      .then(
        res.json({
          message: "User successfully Added",
        })
      )
      .catch((error) => {
        res.json({ message: `User unsuccessfully added ${error}` });
      });
  });
};

const login = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ $or: [{ email: username }, { phone: username }] }).then(
    (user) => {
      if (user) {
        bcrypt.compare(password, user.password, (error, result) => {
          if (error) {
            res.json({
              message: `Failed to login ${error}`,
            });
          }

          if (result) {
            const token = jwt.sign({ name: username }, process.env.SECRET_KEY, {
              expiresIn: "6h",
            });

            const refreshToken = jwt.sign(
              { name: username },
              process.env.REFRESH_SECRET_KEY,
              {
                expiresIn: "2d",
              }
            );

            res.json({
              message: "Login Successfully",
              token,
              refreshToken,
            });
          } else {
            res.json({
              message: "password does not match",
            });
          }
        });
      } else {
        res.json({
          message: "User not found",
        });
      }
    }
  );
};

const refreshToken = (req, res, next) => {
  const refreshToken = req.body.refreshToken;

  jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (error, decode) => {
    if (error) {
      req.status(400).json({
        message: `Unable to refresh token ${error}`,
      });
    } else {
      const token = jwt.sign({ name: decode.name }, process.env.SECRET_KEY, {
        expiresIn: "2h",
      });

      const refreshToken = req.body.refreshToken;

      res.status(200).json({
        message: "Token successfully refreshed",
        token: token,
        refreshToken: refreshToken,
      });
    }
  });
};

module.exports = { register, login, refreshToken };
