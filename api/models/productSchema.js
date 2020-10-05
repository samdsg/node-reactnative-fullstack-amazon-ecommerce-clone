const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//* Product Schema *//
const ProductSchema = new Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  desc: { type: String, required: true },
  imageUrl: { type: String, required: true },
  date: { type: Date, default: Date.now },
  cart: { type: Boolean, default: false },
});

module.exports = Product = mongoose.model("product", ProductSchema);
