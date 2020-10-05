"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema; // Create Schema

var MediaSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  originalname: {
    type: String,
    required: true
  },
  encoding: {
    type: String,
    required: true
  },
  mimetype: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  mediaID: {
    type: String,
    required: true
  }
});
module.exports = Media = mongoose.model("mediaBucket", MediaSchema);