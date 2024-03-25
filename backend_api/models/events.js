// models/Event.js

const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  location: String
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
