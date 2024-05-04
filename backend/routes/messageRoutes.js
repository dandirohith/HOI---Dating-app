const express = require("express");
const { protectRoute } = require("../middleware/protectRoute");
const {
  sendMessage,
  getMessages,
} = require("../controllers/messageController");

const router = express.Router();

router.post("/send/:id", protectRoute, sendMessage);
router.get("/get/:id", protectRoute, getMessages);

module.exports = router;
