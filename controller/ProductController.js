const { Product } = require("../models/Product");

const getAllProduct = (req, res, next) => {
  Product.find()
    .then((response) => {
      res.status(200).json({
        data: response,
        message: "Sucessfully to load product list",
        error: null,
      });
    })
    .catch((error) => {
      res.json({
        data: null,
        message: "Failed to load product",
        error: error,
      });
    });
};

const addProduct = (req, res, next) => {
  const { name, price, link, stock, videoId } = req.body;

  const newProduct = new Product({
    name: name,
    price: price,
    link: link,
    stock: stock,
    videoId: videoId,
    productOwner: req.userData._id,
  });

  newProduct
    .save()
    .then((response) => {
      res.status(200).json({
        data: response,
        message: "Sucessfully create a new product",
        error: null,
      });
    })
    .catch((error) => {
      res.json({
        data: null,
        message: "Failed to add product",
        error: error,
      });
    });
};

const getProductByVideoId = (req, res, next) => {
  const { id: videoId } = req.params;

  Product.find({ videoId: videoId })
    .then((response) => {
      res.status(200).json({
        data: response,
        message: "Sucessfully to load product list",
        error: null,
      });
    })
    .catch((error) => {
      res.json({
        data: null,
        message: "Failed to load product by video id",
        error: error,
      });
    });
};

module.exports = {
  getAllProduct,
  addProduct,
  getProductByVideoId,
};
