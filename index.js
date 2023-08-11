require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const AuthRoutes = require("./routers/auth");
const VideoController = require("./routers/video");
const ProductController = require("./routers/product");
const CommentController = require("./routers/Comment");

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

// Cors
app.use(
  cors({
    origin: "http://localhost:3000", // Set the allowed origin
    credentials: true, // Allow credentials (cookies, etc.)
  })
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());

app.listen(port, () => {
  console.log("Server is running");
});

// Using Routes
app.use("/api", AuthRoutes);
app.use("/", VideoController);
app.use("/product", ProductController);
app.use("/comment", CommentController);
