const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema(
  {
    user1: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    user2: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "message",
        unique: true,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = Conversation = mongoose.model(
  "conversation",
  conversationSchema
);
