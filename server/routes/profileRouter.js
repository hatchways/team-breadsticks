const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
// uploadController doesn't exist in the current main branch.
// const uploadController = require("../controllers/uploadController");

router.post("/", profileController.createProfile);
router.put("/update", profileController.updateProfile);
router.get("/", profileController.findProfile);
router.get("/all", profileController.getAllProfiles);
// router.post("/upload", uploadController.setUpload);

module.exports = router;
