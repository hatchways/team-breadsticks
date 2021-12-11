const Profile = require("../models/ProfileModel");
const mongoose = require("mongoose");
const { capitalize, formatAddress } = require("../utils/helperFunctions");
const asyncHandler = require("express-async-handler");

// @route POST /profile
// @access private
// @desc Create a default profile of a logged-in user. Note: this profile is not a 'Sitter' profile
exports.createProfile = asyncHandler(async (req, res, next) => {
  try {
    const { firstName, lastName, gender, birth, phone, address, description } =
      req.body;
    const userId = req.user.id;

    let profile = await Profile.findOne({ userId });
    if (profile) {
      res.status(409);
      throw new Error("Profile already exists");
    }

    const data = {
      userId,
      firstName: capitalize(firstName),
      lastName: capitalize(lastName),
      gender,
      birth,
      phone,
      address: formatAddress(address),
      description,
    };
    profile = new Profile(data);
    await profile.save();

    res.status(201).json(profile);
  } catch (err) {
    next(err);
  }
});

// @route PUT /profile/:profileId
// @access private
// @desc Update a profile of a logged-in user ONLY. It should not be able to update other user's profile.
exports.updateProfile = asyncHandler(async (req, res, next) => {
  try {
    const { profileId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(profileId)) {
      res.status(400);
      throw new Error("Invalid profileId");
    }

    const userId = req.user.id;

    const {
      firstName,
      lastName,
      gender,
      birth,
      phone,
      address,
      description,
      isSitter,
      title,
      hourlyWage,
      availability,
    } = req.body;

    const data = {
      userId,
      firstName: capitalize(firstName),
      lastName: capitalize(lastName),
      gender,
      birth,
      phone,
      address: formatAddress(address),
      description,
      title,
      isSitter,
      hourlyWage,
      availability,
    };

    const updatedProfile = await Profile.findOneAndUpdate(
      { _id: profileId, userId },
      data,
      {
        new: true,
      }
    );

    if (!updatedProfile) {
      res.status(404);
      throw new Error(
        "Couldn't find a profile with the profileId for this user"
      );
    }

    res.status(200).json(updatedProfile);
  } catch (err) {
    next(err);
  }
});

// @route PATCH /profile/:profileId
// @access private
// @desc patch a profile of a logged-in user. Only provided props will be updated.
exports.patchProfile = async (req, res, next) => {
  try {
    const { profileId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(profileId)) {
      res.status(400);
      throw new Error("Invalid profileId");
    }

    const userId = req.user.id;
    const {
      firstName,
      lastName,
      gender,
      birth,
      phone,
      address,
      description,
      isSitter,
      title,
      hourlyWage,
      availability,
    } = req.body;

    const data = {
      userId,
      firstName: firstName ? capitalize(firstName) : firstName,
      lastName: lastName ? capitalize(lastName) : lastName,
      gender,
      birth,
      phone,
      address: address ? formatAddress(address) : address,
      description,
      title,
      isSitter,
      hourlyWage,
      availability,
    };

    for (const [key, value] of Object.entries(data)) {
      if (value === undefined) delete data[key];
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { _id: profileId, userId },
      { $set: { ...data } },
      { new: true }
    );

    if (!updatedProfile) {
      res.status(403);
      throw new Error(
        "Couldn't find a profile with the profileId for this user"
      );
    }
    res.status(200).json(updatedProfile);
  } catch (err) {
    next(err);
  }
};

// @route GET /profile/:profileId
// @route GET /profile/:profileId
// @access private
// @desc Get a profile with given profileId. profileId can be either a logged in user's profileId or other user's profileId.
exports.findProfile = asyncHandler(async (req, res, next) => {
  try {
    const { profileId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(profileId)) {
      res.status(400);
      throw new Error("Invalid profileId");
    }

    const profile = await Profile.findOne({ _id: profileId });

    if (!profile) {
      res.status(404);
      throw new Error("Profile not found");
    }

    res.status(200).json(profile);
  } catch (err) {
    next(err);
  }
});

// @route GET /profile/my-profile
// @access private
// @desc Get a profile of a currently logged in user.
exports.userProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const profile = await Profile.findOne({ userId });

    if (!profile) {
      res.status(404);
      throw new Error("Profile not found");
    }

    res.status(200).json(profile);
  } catch (err) {
    next(err);
  }
};

// @route GET /profile
// @access private
// @desc Get all sitter profiles only.
exports.getAllProfiles = asyncHandler(async (req, res, next) => {
  try {
    let { city, searchStartDate, searchEndDate } = req.query;
    let sitters;

    if (searchStartDate === "" || searchEndDate === "") {
      res.status(400);
      throw new Error("You must set searchStartDate and searchEndDate");
    }

    if (city || (searchStartDate && searchEndDate)) {
      sitters = await Profile.find({
        isSitter: true,
        address: { $regex: city, $options: "i" },
      });
    }

    if (!sitters) {
      res.status(404);
      throw new Error("No sitters found");
    }

    let searchStartDateInNum = new Date(searchStartDate).getUTCDay();
    let searchEndDateInNum = new Date(searchEndDate).getUTCDay();

    if (searchStartDateInNum > searchEndDateInNum) {
      searchEndDateInNum += 7;
    }

    const userSearchingDays = [];
    for (
      let dayNumVersion = searchStartDateInNum;
      dayNumVersion <= searchEndDateInNum;
      dayNumVersion++
    ) {
      let temp = dayNumVersion;
      if (dayNumVersion >= 7) {
        temp -= 7;
      }
      userSearchingDays.push(temp);
    }
    userSearchingDays.sort();

    const searchedSitters = sitters.filter((sitter) => {
      sitter.availability[0]._doc.availableSittingDaysInNum = [];
      for (const key in sitter.availability[0]._doc) {
        if (sitter.availability[0]._doc[key].length) {
          switch (key) {
            case "sunday":
              sitter.availability[0]._doc.availableSittingDaysInNum.push(0);
              break;
            case "monday":
              sitter.availability[0]._doc.availableSittingDaysInNum.push(1);
              break;
            case "tuesday":
              sitter.availability[0]._doc.availableSittingDaysInNum.push(2);
              break;
            case "wednesday":
              sitter.availability[0]._doc.availableSittingDaysInNum.push(3);
              break;
            case "thursday":
              sitter.availability[0]._doc.availableSittingDaysInNum.push(4);
              break;
            case "friday":
              sitter.availability[0]._doc.availableSittingDaysInNum.push(5);
              break;
            case "saturday":
              sitter.availability[0]._doc.availableSittingDaysInNum.push(6);
              break;
            default:
              break;
          }
        }
      }
      return userSearchingDays.every((dayNum) =>
        sitter.availability[0]._doc.availableSittingDaysInNum.includes(dayNum)
      );
    });

    if (searchedSitters.length === 0) {
      res.status(404);
      throw new Error("No sitters found in search");
    }

    res.status(200).json(searchedSitters);
  } catch (err) {
    next(err);
  }
});
