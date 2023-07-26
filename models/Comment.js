const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
    },
    username: {
      type: String,
    },
    comment: {
      type: String,
    },
    videoId: {
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = { Comment };
