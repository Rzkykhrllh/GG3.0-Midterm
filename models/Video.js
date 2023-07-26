const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema(
  {
    title: {
      type: String,
    },
    thumbnailUrl: {
      type: String,
    },
    videoOwner: {
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);
module.exports = { Video };
