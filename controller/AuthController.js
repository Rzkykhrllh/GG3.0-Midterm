const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res, next) => {
  // Check if the email is already in use
  User.findOne({ email: req.body.email })
    .then((existingEmailUser) => {
      if (existingEmailUser) {
        return res.status(400).json({ message: "Email already in use" });
      }

      // Check if the phone number is already in use
      User.findOne({ phone: req.body.phone })
        .then((existingPhoneUser) => {
          if (existingPhoneUser) {
            return res
              .status(400)
              .json({ message: "Phone number already in use" });
          }

          bcrypt.hash(req.body.password, 10, (error, hashedPassword) => {
            if (error) {
              return res.status(500).json({ error: error });
            }

            const newUser = new User({
              name: req.body.name,
              email: req.body.email,
              phone: req.body.phone,
              password: hashedPassword,
            });

            newUser
              .save()
              .then(() => {
                res.status(201).json({
                  message: "User successfully added",
                });
              })
              .catch((error) => {
                res
                  .status(500)
                  .json({ message: `User unsuccessfully added ${error}` });
              });
          });
        })
        .catch((error) => {
          res
            .status(500)
            .json({ message: `Error checking phone number ${error}` });
        });
    })
    .catch((error) => {
      res.status(500).json({ message: `Error checking email ${error}` });
    });
};

const login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ $or: [{ email: email }] }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (error, result) => {
        if (error) {
          res.status(401).json({
            message: `Failed to login ${error}`,
          });
        }

        if (result) {
          const token = jwt.sign({ name: email }, process.env.SECRET_KEY, {
            expiresIn: "2h",
          });

          const refreshToken = jwt.sign(
            { name: email },
            process.env.REFRESH_SECRET_KEY,
            {
              expiresIn: "2d",
            }
          );

          res.status(200).json({
            message: "Login Successfully",
            token,
            refreshToken,
          });
        } else {
          res.status(401).json({
            message: "password does not match",
          });
        }
      });
    } else {
      res.status(401).json({
        message: "User not found",
      });
    }
  });
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
