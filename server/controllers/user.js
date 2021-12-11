const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const Profile = require("../models/ProfileModel");

// @route POST /users
// @desc Search for users
// @access Private
exports.searchUsers = asyncHandler(async (req, res, next) => {
  const searchString = req.query.search;

  let users;
  if (searchString) {
    users = await User.find({
      username: { $regex: searchString, $options: "i" },
    });
  }

  if (!users) {
    res.status(404);
    throw new Error("No users found in search");
  }

  res.status(200).json({ users: users });
});

exports.updateProfile = asyncHandler(async (req, res) => {
  console.log("here");
  const userId = req.user.id;

  const {
    firstName,
    lastName,
    gender,
    birthDate,
    phoneNumber,
    email,
    address,
    description,
  } = req.body;

  const profile = new Profile({
    firstName,
    lastName,
    gender,
    birthDate,
    phoneNumber,
    email,
    address,
    description,
  });

  const updateStatus = await User.updateOne(
    { _id: userId },
    {
      $set: {
        profile,
      },
    }
  );
  if (updateStatus.nModified === 1) {
    return res.status(201).json({ success: true });
  } else {
    return res.status(201).json({ success: false });
  }

  throw new Error("something went wrong");
});

exports.getProfile = asyncHandler(async (req, res) => {
  try {
    const userProfile = await User.findById({ _id: req.params.userId }).select(
      "profile"
    );
    return res.status(200).json(userProfile);
  } catch (err) {
    return res.status(404).send(err);
  }
});

exports.getAllProfiles = asyncHandler(async (req, res) => {
  try {
    const allProfiles = await User.find().select("profile");
    return res.status(200).json(allProfiles);
  } catch (err) {
    return res.status(404).send(err);
  }
});
