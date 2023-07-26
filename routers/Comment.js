const express = require("express");
const router = express.Router();

const CommentController = require("../controller/CommentController");

const { authenticate } = require("../middleware/authenticate");

router.get("/:id", CommentController.getComment);
router.post("/:id", authenticate, CommentController.addComment);

module.exports = router;
