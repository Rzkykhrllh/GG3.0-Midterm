const { Video } = require("../models/Video");

// Get Video
const getAllVideo = (req, res, next) => {
  Video.find()
    .then((response) => {
      res.status(200).json({
        data: response,
        message: "Sucessfully to load video list",
        error: null,
      });
    })
    .catch((error) => {
      res.json({
        data: null,
        message: "Failed to load data",
        error: error,
      });
    });
};

module.exports = { getAllVideo };
