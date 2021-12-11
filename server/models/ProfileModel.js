const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: false,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      default: null,
    },
    photos: [String],
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Male",
    },
    availability: {
      type: [
        {
          sunday: [Date, Date],
          monday: [Date, Date],
          tuesday: [Date, Date],
          wednesday: [Date, Date],
          thursday: [Date, Date],
          friday: [Date, Date],
          saturday: [Date, Date],
        },
      ],
      default: undefined,
    },
    isSitter: {
      type: Boolean,
      default: false,
    },
    hourlyWage: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = Profile = mongoose.model("profile", profileSchema);
