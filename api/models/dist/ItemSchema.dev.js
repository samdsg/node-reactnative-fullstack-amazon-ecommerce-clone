"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema; // Create Schema

var ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    "default": Date.now
  },
  price: {
    type: String,
    required: true
  }
});
module.exports = Item = mongoose.model("item", ItemSchema);