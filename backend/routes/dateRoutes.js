const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
  addPic,
  getProfilePics,
  getProfiles,
} = require("../controllers/dateController");
const { protectRoute } = require("../middleware/protectRoute");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/addpic/:id", upload.single("image"), addPic);
router.get("/getprofilepics/:id", getProfilePics);
router.get("/getprofiles/:id", getProfiles);

module.exports = router;
