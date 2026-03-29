const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const chatController = require("../controllers/chat.controller");


router.use(authMiddleware);
router.route("/")
    .get(chatController.getChatPage);


module.exports = router;
