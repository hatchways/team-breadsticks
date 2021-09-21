const mongoose = require("mongoose");
Schema = mongoose.Schema;
const User = require("./User");

const profileSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  address: {
    type: String,
    minlength: 3,
    maxlength: 200,
  },
  phone: {
    type: String,
    minlength: 5,
    maxlength: 20,
  },
  description: {
    type: String,
    minlength: 3,
    maxlength: 1000,
  },
  birth: {
    type: String,
    minlength: 3,
    maxlength: 30,
  },
  gender: String,
  availability: {
    type: [String],
    default: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
});

module.exports = Profile = mongoose.model("profile", profileSchema);
