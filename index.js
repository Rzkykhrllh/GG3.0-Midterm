require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const AuthRoutes = require("./routers/auth");
const VideoController = require("./routers/video");

const mongoUrl = process.env.DATABASE_URL;
const port = process.env.PORT;

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.log("Failed to connect to mongoDB");
    console.log(error.message);
  });

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log("Server is running");
});

// Using Routes
app.use("/api", AuthRoutes);
app.use("/", VideoController);
