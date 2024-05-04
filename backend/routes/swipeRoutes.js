const express = require("express");
const router = express.Router();
const { protectRoute } = require("../middleware/protectRoute");
const { swipeRight, swipeLeft } = require("../controllers/swipeController");

router.post("/right/:id", protectRoute, swipeRight);
router.post("/left/:id", protectRoute, swipeLeft);

module.exports = router;
