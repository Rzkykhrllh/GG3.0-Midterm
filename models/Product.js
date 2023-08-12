const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    link: {
      type: String,
    },
    stock: {
      type: Number,
    },
    videoId: {
      type: Schema.Types.ObjectId,
    },
    thumbnailUrl: {
      type: String,
    },
    productOwner: {
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = { Product };
