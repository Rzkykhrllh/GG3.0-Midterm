const express = require("express");
const router = express.Router();

const ProductController = require("../controller/ProductController");

const { authenticate } = require("../middleware/authenticate");

router.get("/", ProductController.getAllProduct);
router.post("/addProduct", ProductController.addProduct);

router.get("/getProductByVideoId", ProductController.getProductByVideoId);

module.exports = router;
