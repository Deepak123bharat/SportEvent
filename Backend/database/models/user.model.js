const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  image: String,
  email: {
    type: String,
  },
  authType: {
    type: String,
    enum: ["github", "google", "facebook", "email-password"],
    default: "email-password",
  },
  eventsCount: {
    type: Number,
    default: 0,
  },
  password: {
    type: String,
    minLength: 8,
  },
  requestedEvents: { type: Array, default: [] },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
