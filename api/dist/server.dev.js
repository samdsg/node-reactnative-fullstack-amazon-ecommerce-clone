"use strict";

var express = require("express");

var mongoose = require("mongoose");

var config = require("config");

var dotenv = require("dotenv");

var morgan = require("morgan");

var app = express(); // Bodyparser Middleware

app.use(express.json()); // Load environment settings

dotenv.config({
  path: "./config.env"
}); // DB Config

var db = config.get("mongoURI"); // Connect to Mongo

mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log("MongoDB Connected...");
})["catch"](function (err) {
  return console.log(err);
}); // * Dev logging

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} // Use Routes


app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
var port = process.env.PORT || 5000;
app.listen(port, function () {
  return console.log("Server started on port ".concat(port));
});