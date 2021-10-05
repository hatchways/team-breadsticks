const Profile = require("../models/ProfileModel");
const User = require("../models/User");
const mongoose = require("mongoose");

const toObjectId = mongoose.Types.ObjectId;

// create new profile using given arguments

exports.createProfile = async (req, res, next) => {
  try {
    const { firstName, lasttName, phone, address, gender, description } =
      req.body;

    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(401).json({ message: "Not Authorized" });
    }

    if (
      firstName === undefined ||
      lasttName === undefined ||
      phone === undefined ||
      address === undefined ||
      gender === undefined ||
      description === undefined
    ) {
      res.status(401).json({ message: "Complete the form please" });
    }
    const data = {
      userId: toObjectId(userId),
      firstName: firstName.trim().toString(),
      lasttName: lasttName.trim().toString(),
      phone: phone.trim().toString(),
      address: address.trim().toString(),
      gender: gender.trim().toString(),
      description: description.trim().toString(),
    };
    const newProfile = new Profile(data);
    const profile = await newProfile.save();
    res.status(201).json(profile);
  } catch (err) {
    next(err);
  }
};

// updating existing profile using given id and new data

exports.updateProfile = async (req, res, next) => {
  try {
    const { firstName, lasttName, phone, address, gender, description } =
      req.body;

    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(401).json({ message: "Not Authorized" });
    }

    if (
      firstName === undefined ||
      lasttName === undefined ||
      phone === undefined ||
      address === undefined ||
      gender === undefined ||
      description === undefined
    ) {
      res.status(401).json({ message: "Complete the form please" });
    }
    const data = {
      userId: toObjectId(userId),
      firstName: firstName.trim().toString(),
      lasttName: lasttName.trim().toString(),
      phone: phone.trim().toString(),
      address: address.trim().toString(),
      gender: gender.trim().toString(),
      description: description.trim().toString(),
    };
    await Profile.findOneAndUpdate({ userId }, data);
    res.status(200).json({ message: " your profile is updated" });
  } catch (err) {
    next(err);
  }
};

// find a profile using user id

exports.findProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(401).json({ message: "Not Authorized" });
    }
    const profile = await Profile.findOne({ userId });
    res.status(200).json(profile);
  } catch (err) {
    next(err);
  }
};

// Get All profiles
exports.getAllProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (err) {
    next(err);
  }
};
