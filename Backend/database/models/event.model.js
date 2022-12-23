const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minLength: 5,
    },
    image: { type: String },
    timming: { type: Date },
    duration: { type: Number },
    entryFees: { type: Number, default: 0 },
    address: { type: String },
    soprts: { type: String },
    court: { type: String },
    rating: { type: Number },
    icons: { type: [String] },
    icon: { type: String },
    author: {
      _id: String,
      name: String,
      image: String,
    },
    playerLimit: {
      type: Number,
      default: 1,
    },
    players: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);

const eventModel = mongoose.model("events", eventSchema); //events

module.exports = eventModel;
