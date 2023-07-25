const express = require("express");
const router = express.Router();

const VideoController = require("../controller/VideoController");

const { authenticate } = require("../middleware/authenticate");

router.get("/", VideoController.getAllVideo);

module.exports = router;
