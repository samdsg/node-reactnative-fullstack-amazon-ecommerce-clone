"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema; // Create Schema

var ItemSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  mediaID: {
    type: String,
    requied: true
  },
  price: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    "default": Date.now
  }
});
module.exports = Item = mongoose.model("item", ItemSchema);