const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const profileController = require("../controllers/profileController");
const { validateProfile, validateSitterProfile } = require("../validate");
// uploadController doesn't exist in the current main branch.
// const uploadController = require("../controllers/uploadController");

router.post("/", protect, validateProfile, profileController.createProfile);
router.put(
  "/:profileId",
  protect,
  validateProfile,
  validateSitterProfile,
  profileController.updateProfile
);
router.patch("/:profileId", protect, profileController.patchProfile);
router.get("/my-profile", protect, profileController.userProfile);
router.get("/:profileId", protect, profileController.findProfile);
router.get("/", protect, profileController.getAllProfiles);

module.exports = router;
