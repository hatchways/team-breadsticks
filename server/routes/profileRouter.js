const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  updateProfile,
  userProfile,
  findProfile,
  getAllProfiles,
  createProfile,
  setProfile,
} = require("../controllers/profileController");

const { validateProfile, validateSitterProfile } = require("../validate");
// uploadController doesn't exist in the current main branch.
// const uploadController = require("../controllers/uploadController");

router.post("/", protect, validateProfile, createProfile);
router.put(
  "/:profileId",
  protect,
  validateProfile,
  validateSitterProfile,
  updateProfile
);
router.post("/update-profile", protect, setProfile);
router.get("/my-profile", protect, userProfile);
router.get("/:profileId", protect, findProfile);
router.get("/", protect, getAllProfiles);

module.exports = router;
