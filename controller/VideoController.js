const { Video } = require("../models/Video");
const User = require("../models/User");
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

const getVideo = async (req, res, next) => {
  const { id: videoId } = req.params;
  try {
    const videoResponse = await Video.findById(videoId);

    if (!videoResponse) {
      return res.status(404).json({
        data: null,
        message: "Video not found",
        error: null,
      });
    }

    try {
      const userResponse = await User.findById(videoResponse.videoOwner);

      if (!userResponse) {
        const { _id, title, thumbnailUrl, videoOwner, videoUrl } =
          videoResponse;
        return res.status(200).json({
          data: {
            _id,
            title,
            thumbnailUrl,
            videoOwner,
            videoUrl,
          },
          message: "Successfully loaded video and user data",
          error: null,
        });
      }

      console.log("I must be here");
      console.log(videoResponse);

      const { _id, title, thumbnailUrl, videoOwner, videoUrl } = videoResponse;
      return res.status(200).json({
        data: {
          _id,
          title,
          thumbnailUrl,
          videoOwner,
          videoUrl,
          videoOwnerUsername: userResponse.name,
        },
        message: "Successfully loaded video and user data",
        error: null,
      });
    } catch (error) {
      // Fail to load user, but sttill get the video
      const { _id, title, thumbnailUrl, videoOwner, videoUrl } = videoResponse;
      return res.status(200).json({
        data: {
          _id,
          title,
          thumbnailUrl,
          videoOwner,
          videoUrl,
        },
        message: "Successfully loaded video and user data",
        error: null,
      });
    }
  } catch (error) {
    console.log(0);
    console.log(error);
    return res.status(500).json({
      data: null,
      message: "Failed to load data",
      error: error,
    });
  }
};

// Post Video
const addVideo = (req, res, next) => {
  const { thumbnailUrl, title, videoUrl } = req.body;
  const { _id: userId } = req.userData;

  const newVideo = new Video({
    title: title,
    thumbnailUrl: thumbnailUrl,
    videoOwner: userId,
    videoUrl: videoUrl,
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

module.exports = { getAllVideo, getVideo, addVideo };
