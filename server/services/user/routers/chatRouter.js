const ChatController = require("../controllers/chatController");
const Authentication = require("../middleware/authentication");
const router = require("express").Router();

router.post("/", Authentication, ChatController.saveChat);
router.get(
  "/magnet/:magnetId",
  Authentication,
  ChatController.getChatsByMagnetId
);

module.exports = router;
