const express = require("express");
const router = express.Router();

const VideoController = require("../controller/VideoController");

const { authenticate } = require("../middleware/authenticate");

router.get("/", VideoController.getAllVideo);
router.post("/addVideo", authenticate, VideoController.addVideo);

module.exports = router;
