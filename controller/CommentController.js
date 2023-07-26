const { Comment } = require("../models/Comment");

// Get Video
const getComment = (req, res, next) => {
  const { id: videoId } = req.params;

  Comment.find({ videoId: videoId })
    .then((response) => {
      res.status(200).json({
        data: response,
        message: "Sucessfully to load comment list",
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

// Post Comment
const addComment = (req, res, next) => {
  const { id: videoId } = req.params;
  const { userId, username, comment } = req.body;

  const newComment = new Comment({
    userId: userId,
    username: username,
    comment: comment,
    videoId: videoId,
  });

  newComment
    .save()
    .then((response) => {
      console.log(response.userId.toHexString());
      res.status(200).json({
        data: response,
        message: "Sucessfully Comment on Video",
        error: null,
      });
    })
    .catch((error) => {
      res.json({
        data: null,
        message: "Failed to Comment on Video",
        error: error,
      });
    });
};

module.exports = { getComment, addComment };