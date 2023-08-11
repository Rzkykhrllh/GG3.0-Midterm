const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res, next) => {
  console.log(req.body);

  // Check if the email is already in use
  User.findOne({ email: req.body.email })
    .then((existingEmailUser) => {
      if (existingEmailUser) {
        console.log("email udah kepake sih bang");
        return res.status(400).json({ message: "Email already in use" });
      }

      console.log("1");

      // Check if the phone number is already in use
      User.findOne({ phone: req.body.phone })
        .then((existingPhoneUser) => {
          if (existingPhoneUser) {
            console.log("nomor telpon udah kepake sih bang");
            return res
              .status(400)
              .json({ message: "Phone number already in use" });
          }

          console.log("2");

          console.log(req.body);

          bcrypt.hash(req.body.password, 10, (error, hashedPassword) => {
            if (error) {
              console.log("2 tapi error");
              return res.status(500).json({ error: error });
            }

            const newUser = new User({
              name: req.body.name,
              email: req.body.email,
              phone: req.body.phone,
              password: hashedPassword,
            });

            console.log(3);

            newUser
              .save()
              .then(() => {
                console.log(4);
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
          console.log("4 tapi error");
          res
            .status(500)
            .json({ message: `Error checking phone number ${error}` });
        });
    })
    .catch((error) => {
      console.log("error di email bang");
      res.status(500).json({ message: `Error checking email ${error}` });
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
