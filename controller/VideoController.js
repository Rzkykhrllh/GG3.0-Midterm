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

// Post Video
const addVideo = (req, res, next) => {
  const { thumbnailUrl, title } = req.body;
  const { _id: userId } = req.userData;

  const newVideo = new Video({
    title: title,
    thumbnailUrl: thumbnailUrl,
    videoOwner: userId,
  });

  newVideo
    .save()
    .then((response) => {
      res.status(200).json({
        data: response,
        message: "Sucessfully create a new video",
        error: null,
      });
    })
    .catch((error) => {
      res.json({
        data: null,
        message: "Failed to add video",
        error: error,
      });
    });
};

module.exports = { getAllVideo, addVideo };
