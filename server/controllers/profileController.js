const Profile = require("../models/ProfileModel");

// create new profile using given arguments

exports.createProfile = async (req, res, next) => {
  try {
    const { firstName, lasttName, phone, address, gender, description } =
      req.body;
    let data = {
      userId: req.params.id,
      firstName: firstName.trim().toString(),
      lasttName: lasttName.trim().toString(),
      phone: phone.trim().toString(),
      address: address.trim().toString(),
      gender: gender.trim().toString(),
      description: description.trim().toString(),
    };
    let newProfile = await new Profile(data);
    let profile = await newProfile.save();
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
    let data = {
      userId: req.params.id,
      firstName: firstName.trim().toString(),
      lasttName: lasttName.trim().toString(),
      phone: phone.trim().toString(),
      address: address.trim().toString(),
      gender: gender.trim().toString(),
      description: description.trim().toString(),
    };
    await Profile.findByIdAndUpdate(req.params.id, data);
    res.status(200).json({ message: " your profile is updated" });
  } catch (err) {
    next(err);
  }
};

// find a profile using its id

exports.findProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findById(req.params.id);
    res.status(200).json(profile);
  } catch (err) {
    next(err);
  }
};

// Get All profiles
exports.getAllProfiles = async (req, res, next) => {
  try {
    let profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (err) {
    next(err);
  }
};
